import { EventEmitter } from 'events';
import createDebug from 'debug';
import { proxy } from 'comlink';
import { randomBytes } from '../random/index.js';
import { fetchCode, getNumCpu, createWorker, getRemoteBarretenbergWasm, threadLogger, killSelf, } from './browser/index.js';
const debug = createDebug('bb.js:wasm');
EventEmitter.defaultMaxListeners = 30;
export class BarretenbergWasm {
    constructor() {
        this.memStore = {};
        this.workers = [];
        this.remoteWasms = [];
        this.nextWorker = 0;
        this.nextThreadId = 1;
        this.isThread = false;
        this.logger = debug;
    }
    static async new() {
        const barretenberg = new BarretenbergWasm();
        await barretenberg.init(1);
        return barretenberg;
    }
    /**
     * Construct and initialise BarretenbergWasm within a Worker. Return both the worker and the wasm proxy.
     * Used when running in the browser, because we can't block the main thread.
     */
    static async newWorker(threads) {
        const worker = createWorker();
        const wasm = getRemoteBarretenbergWasm(worker);
        await wasm.init(threads, proxy(debug));
        return { worker, wasm };
    }
    getNumThreads() {
        return this.workers.length + 1;
    }
    /**
     * Init as main thread. Spawn child threads.
     */
    async init(threads = Math.min(getNumCpu(), BarretenbergWasm.MAX_THREADS), logger = debug, initial = 25, maximum = 2 ** 16) {
        this.logger = logger;
        const initialMb = (initial * 2 ** 16) / (1024 * 1024);
        const maxMb = (maximum * 2 ** 16) / (1024 * 1024);
        this.logger(`initial mem: ${initial} pages, ${initialMb}MiB. ` +
            `max mem: ${maximum} pages, ${maxMb}MiB. ` +
            `threads: ${threads}`);
        this.memory = new WebAssembly.Memory({ initial, maximum, shared: threads > 1 });
        // Annoyingly the wasm declares if it's memory is shared or not. So now we need two wasms if we want to be
        // able to fallback on "non shared memory" situations.
        const code = await fetchCode(threads > 1 ? 'barretenberg-threads.wasm' : 'barretenberg.wasm');
        const { instance, module } = await WebAssembly.instantiate(code, this.getImportObj(this.memory));
        this.instance = instance;
        // Init all global/static data.
        this.call('_initialize');
        // Create worker threads. Create 1 less than requested, as main thread counts as a thread.
        this.logger('creating worker threads...');
        this.workers = (await Promise.all(Array.from({ length: threads - 1 }).map(createWorker)));
        this.remoteWasms = await Promise.all(this.workers.map(getRemoteBarretenbergWasm));
        await Promise.all(this.remoteWasms.map(w => w.initThread(module, this.memory)));
        this.logger('init complete.');
    }
    /**
     * Init as worker thread.
     */
    async initThread(module, memory) {
        this.isThread = true;
        this.logger = threadLogger() || this.logger;
        this.memory = memory;
        this.instance = await WebAssembly.instantiate(module, this.getImportObj(this.memory));
    }
    /**
     * Called on main thread. Signals child threads to gracefully exit.
     */
    async destroy() {
        await Promise.all(this.workers.map(w => w.terminate()));
    }
    getImportObj(memory) {
        /* eslint-disable camelcase */
        const importObj = {
            // We need to implement a part of the wasi api:
            // https://github.com/WebAssembly/WASI/blob/main/phases/snapshot/docs.md
            // We literally only need to support random_get, everything else is noop implementated in barretenberg.wasm.
            wasi_snapshot_preview1: {
                random_get: (out, length) => {
                    out = out >>> 0;
                    const randomData = randomBytes(length);
                    const mem = this.getMemory();
                    mem.set(randomData, out);
                },
                clock_time_get: (a1, a2, out) => {
                    out = out >>> 0;
                    const ts = BigInt(new Date().getTime()) * 1000000n;
                    const view = new DataView(this.getMemory().buffer);
                    view.setBigUint64(out, ts, true);
                },
                proc_exit: () => {
                    this.logger('HUNG: proc_exit was called. This is caused by unstable experimental wasi pthreads. Try again.');
                    this.logger(new Error().stack);
                    killSelf();
                },
            },
            wasi: {
                'thread-spawn': (arg) => {
                    arg = arg >>> 0;
                    const id = this.nextThreadId++;
                    const worker = this.nextWorker++ % this.remoteWasms.length;
                    // this.logger(`spawning thread ${id} on worker ${worker} with arg ${arg >>> 0}`);
                    this.remoteWasms[worker].call('wasi_thread_start', id, arg).catch(this.logger);
                    // this.remoteWasms[worker].postMessage({ msg: 'thread', data: { id, arg } });
                    return id;
                },
            },
            // These are functions implementations for imports we've defined are needed.
            // The native C++ build defines these in a module called "env". We must implement TypeScript versions here.
            env: {
                env_hardware_concurrency: () => {
                    // If there are no workers (we're already running as a worker, or the main thread requested no workers)
                    // then we return 1, which should cause any algos using threading to just not create a thread.
                    return this.remoteWasms.length + 1;
                },
                /**
                 * The 'info' call we use for logging in C++, calls this under the hood.
                 * The native code will just print to std:err (to avoid std::cout which is used for IPC).
                 * Here we just emit the log line for the client to decide what to do with.
                 */
                logstr: (addr) => {
                    const str = this.stringFromAddress(addr);
                    const m = this.getMemory();
                    const str2 = `${str} (mem: ${(m.length / (1024 * 1024)).toFixed(2)}MiB)`;
                    this.logger(str2);
                    if (str2.startsWith('WARNING:')) {
                        this.logger(new Error().stack);
                    }
                },
                get_data: (keyAddr, outBufAddr) => {
                    const key = this.stringFromAddress(keyAddr);
                    outBufAddr = outBufAddr >>> 0;
                    const data = this.memStore[key];
                    if (!data) {
                        this.logger(`get_data miss ${key}`);
                        return;
                    }
                    // this.logger(`get_data hit ${key} size: ${data.length} dest: ${outBufAddr}`);
                    // this.logger(Buffer.from(data.slice(0, 64)).toString('hex'));
                    this.writeMemory(outBufAddr, data);
                },
                set_data: (keyAddr, dataAddr, dataLength) => {
                    const key = this.stringFromAddress(keyAddr);
                    dataAddr = dataAddr >>> 0;
                    this.memStore[key] = this.getMemorySlice(dataAddr, dataAddr + dataLength).slice();
                    // this.logger(`set_data: ${key} length: ${dataLength}`);
                },
                memory,
            },
        };
        /* eslint-enable camelcase */
        return importObj;
    }
    exports() {
        return this.instance.exports;
    }
    /**
     * When returning values from the WASM, use >>> operator to convert signed representation to unsigned representation.
     */
    call(name, ...args) {
        if (!this.exports()[name]) {
            throw new Error(`WASM function ${name} not found.`);
        }
        try {
            return this.exports()[name](...args) >>> 0;
        }
        catch (err) {
            const message = `WASM function ${name} aborted, error: ${err}`;
            this.logger(message);
            this.logger(err.stack);
            if (this.isThread) {
                killSelf();
            }
            else {
                throw err;
            }
        }
    }
    memSize() {
        return this.getMemory().length;
    }
    getMemorySlice(start, end) {
        return this.getMemory().subarray(start, end);
    }
    writeMemory(offset, arr) {
        const mem = this.getMemory();
        mem.set(arr, offset);
    }
    // PRIVATE METHODS
    getMemory() {
        return new Uint8Array(this.memory.buffer);
    }
    stringFromAddress(addr) {
        addr = addr >>> 0;
        const m = this.getMemory();
        let i = addr;
        for (; m[i] !== 0; ++i)
            ;
        const textDecoder = new TextDecoder('ascii');
        return textDecoder.decode(m.slice(addr, i));
    }
}
BarretenbergWasm.MAX_THREADS = 32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFycmV0ZW5iZXJnX3dhc20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUN0QyxPQUFPLFdBQVcsTUFBTSxPQUFPLENBQUM7QUFDaEMsT0FBTyxFQUFVLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLHlCQUF5QixFQUN6QixZQUFZLEVBQ1osUUFBUSxHQUNULE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXhDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFFdEMsTUFBTSxPQUFPLGdCQUFnQjtJQUE3QjtRQUVVLGFBQVEsR0FBa0MsRUFBRSxDQUFDO1FBRzdDLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBQzNDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFdBQU0sR0FBMEIsS0FBSyxDQUFDO0lBMk5oRCxDQUFDO0lBek5RLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRztRQUNyQixNQUFNLFlBQVksR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDNUMsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNB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