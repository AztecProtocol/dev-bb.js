import { wrap } from 'comlink';
// import Worker from 'worker-loader!./sample_worker.js';
import debug from "debug";
export async function fetchCode(multithreading) {
    const wasmModuleUrl = multithreading ?
        new URL(`../../barretenberg-threads.wasm`, import.meta.url) :
        new URL(`../../barretenberg.wasm`, import.meta.url);
    const res = await fetch(wasmModuleUrl.href);
    return await res.arrayBuffer();
}
export function createWorker() {
    const worker = new Worker(new URL(`../barretenberg_wasm.js`, import.meta.url));
    // const worker = new Worker();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRS9CLHlEQUF5RDtBQUN6RCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxDQUFDLEtBQUssVUFBVSxTQUFTLENBQUMsY0FBdUI7SUFDckQsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDcEMsSUFBSSxHQUFHLENBQUMsaUNBQWlDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLE9BQU8sTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZO0lBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRSwrQkFBK0I7SUFDL0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsTUFBYztJQUN0RCxPQUFPLElBQUksQ0FBbUIsTUFBTSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLE9BQU8sU0FBUyxDQUFDLG1CQUFtQixDQUFDO0FBQ3ZDLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVE7SUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2YsQ0FBQyJ9