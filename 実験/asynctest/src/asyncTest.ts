declare function require(name: string): Object;
declare var module: { exports: any };
export declare var process: any;
 
// ウィンドウモードで立ち上げると、 console.log で例外になる場合がある
function tryLog(s: string) {
    try {
        console.log(s);
    } catch (e) { }
}
 
export const waitAsync = async function waitAsync(n: number): Promise<number> {
    var startTime = Date.now();
    var timeInterval = await new Promise<number>((resolve) => setTimeout(() => resolve(Date.now() - startTime), n));
    tryLog(`waited ${timeInterval}ms (@${process.type})`);
    return timeInterval;
}
 
export const runTimes = async function runTimes(c: number, n: number): Promise<void> {
    var timeSum = 0;
    for (var i of Array.from({ length: c }, (v, k) => k)) {
        timeSum += await module.exports.waitAsync(n);
    }
    tryLog(`total waited ${timeSum}ms (@${process.type})`);
}