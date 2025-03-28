import { system } from "@minecraft/server";
import { CensorList } from "./censor";

export class SpamManager {
    /**@type {Map<string, number>} */
    #data=new Map()
    constructor(cooldown=10){
        this.cooldown=cooldown;
        system.runInterval(()=>{
            const now = Date.now();
            for (const [user, last] of this.#data){
                if (now-last>this.cooldown){
                    this.#data.delete(user);
                }
            }
        }, 40);
    }
    allowRate(user, message){
        if (this.cooldown<=0) return 0;

        if (this.#data.has(user)){
            const ttd = Date.now()-this.#data.get(user)
            if (ttd>this.cooldown){
                this.#data.set(user, Date.now());
                return 0;
            }
            else
                return this.cooldown-ttd;
        }
        else {
            this.#data.set(user, Date.now());
        }
    }
    /**
     * Censor bad words from messages
     * @param {string} message message
     */
    censor(message, placeholder='*'){
        for (const bword of CensorList){
            message=message.replace(bword, bword.charAt(0)+placeholder.repeat(bword.length-1));
        }
        return message;
    }

    /**
     * @param {string} message 
     * @param {number} max_length 
     * @returns {string}
     */
    resize(message, max_length){
        return message.substring(0, max_length);
    }
}