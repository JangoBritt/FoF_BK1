import { world, system } from "@minecraft/server";
// import { Time } from "./Time";
import { options } from "./options";

class Time {
    constructor(h, m, s){
        if (h<0||m<0||s<0||h>23||m>59||2>59){
            throw new Error("Time: wrong time out of bounds.");
        }
        this.h=h;
        this.m=m;
        this.s=s;
    }
    after(time){
        if (this.h===time.h)
            if (this.m===time.m)
                return this.s>time.m;
            else return this.m>time.m;
        else return this.h>time.h;
    }
    equals(time){
        return this.h===time.h && this.m===time.m && this.s===time.s;
    }
    afterNow(){
        const now = new Date();
        return this.afterDate(now);
        // return this.after({h:now.getHours(), m:now.getMinutes(), s:now.getSeconds()});
    }
    afterDate(date){
        return this.after({h:date.getHours(), m:date.getMinutes(), s:date.getSeconds()});
    }
    /**@param {Date} date*/
    setOnDate(date){
        return date.setHours(this.h, this.m, this.s, 0);
    }
    toArray(){
        return [this.h, this.m, this.s];
    }
    toNumber(){
        return 1.E3*this.s+6.E4*this.m+3.6E6*this.h;
    }
    static from(h, m, s){
        return new Time(h, m, s)
    }
    static fromString(text){
        return new Time(...text.split(":").map(m=>Number.parseInt(m)));
    }
}

export class TimeManager {
    /**@param {{time:string, text:string}[]} data*/
    constructor(data){
        /**@type {{time:Time, text:string}[]}*/
        this.data = this.parseData(data);
        console.log(JSON.stringify(this.data))
        this.data.sort((a, b)=>a.time.after(b.time)*2-1)
        this.calcNextShout();
    }
    calcNextShout(){
        const next = this.data.filter(v=>v.time.afterNow())[0]??this.data[0];
        const date = new Date();
        if (next.time.afterDate(date)){
            date.setHours(...next.time.toArray())
        }
        else {
            date.setTime(Date.now()+8.64E7);
            date.setHours(...next.time.toArray())
        }

        this.next = {
            date: date.getTime(),
            text: next.text
        }        
    }
    nextJump(){
        const delta = this.next.date - Date.now();
        if (delta>=0){
            if (options.debug){
                console.info("Jumping - " + delta.toString())
            }
            system.runInterval(()=>{
                this.nextJump();
            }, Math.max(3, Math.floor(0.05*delta/10))) // we split the interval in 10 big jumps. At the last one we start making tiny jumps to get the right time
        }
        else {
            world.sendMessage(this.next.text);
            this.calcNextShout();
            this.nextJump();
        }
    }
    parseData(data){
        return data.map(({time, text})=>({time:Time.fromString(time), text:text}));
    }
}