import { wrap } from 'comlink';
import debug from 'debug';
export async function fetchCode(_name) {
    // hardcoded to always use single-threaded (for now)
    const wasmModuleUrl = new URL(`../../barretenberg.wasm`, import.meta.url);
    const res = await fetch(wasmModuleUrl.href);
    return await res.arrayBuffer();
}
export function createWorker() {
    const worker = new Worker('barretenberg_wasm.js');
    const debugStr = debug.disable();
    debug.enable(debugStr);
    worker.postMessage({ debug: debugStr });
    return worker;
}
export function getRemoteBarretenbergWasm(worker) {
    return wrap(worker);
}
export function getNumCpu() {
    return navigator.hardwareConcurrency;
}
export function threadLogger() {
    return undefined;
}
export function killSelf() {
    self.close();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRS9CLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixNQUFNLENBQUMsS0FBSyxVQUFVLFNBQVMsQ0FBQyxLQUFjO0lBQzVDLG9EQUFvRDtJQUNwRCxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxPQUFPLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWTtJQUMxQixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLE1BQWM7SUFDdEQsT0FBTyxJQUFJLENBQW1CLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUztJQUN2QixPQUFPLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxVQUFVLFlBQVk7SUFDMUIsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRO0lBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNmLENBQUMifQ==