/**
 * Timed messages - BedrockBridge addon
 * 
 * 
 * 
 * by InnateAlpaca (https://github.com/InnateAlpaca)
 */
// import { bridge } from '../addons';
import { times } from './times'
// import { world, system } from "@minecraft/server";
// import { Time } from "./Time";
import { TimeManager } from "./TimeManager"
// import { options } from "./options";

console.log("starting timed messages bridge-addon");

const manager = new TimeManager(times);
// manager.nextJump();
