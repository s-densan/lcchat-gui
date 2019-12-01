import {waitAsync, process} from './asyncTest';
declare function require(name: string): any;
  
//var asyncClient = require('./asyncTest');
var asyncRemote = require('electron').remote.require('./asyncTest');
  
async function onClickRunAtClientWaitAtClient() {
    var n = 500;
    var timeSum = 0;
    timeSum += await waitAsync(n);
    timeSum += await waitAsync(n);
    timeSum += await waitAsync(n);
    console.log(`total waited ${timeSum}ms (@${process.type})`);
    console.log("onClickClient fin.");
}
  
async function onClickRunAtRemoteWaitAtClient() {
    var n = 500;
    var timeSum = 0;
    timeSum += await asyncRemote.waitAsync(n);
    timeSum += await asyncRemote.waitAsync(n);
    timeSum += await asyncRemote.waitAsync(n);
    console.log(`total waited ${timeSum}ms (@${process.type})`);
    console.log("onClickRemote fin.");
}
  
async function onClickRunAtRemoteWaitAtRemote() {
    await asyncRemote.runTimes(5, 500);
    console.log("onClickRemoteRun fin.");
}