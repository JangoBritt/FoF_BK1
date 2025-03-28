import { world } from '@minecraft/server'

class Reward {
    /**
     * 
     * @param {"score"|"item"|"experience"} type 
     * @param {number} amount 
     * @param {string} selector
     * @param {string} message 
     */
    constructor(type, amount, selector, message){
        
    }

    recursiveMultiply(x){

    }
    recursiveDivide(x){
        
    }
    recursiveConstant(){
        
    }

    give(player){

    }
}

const a = new Reward('experience', "", 0);

class Achievement {
    /**@param {string} name @param {Reward} reward*/
    constructor(name, reward){
        this.name = name;
        this.reward = reward;

        this.score = world.scoreboard.getObjective(`esploratori:reward_score:${name}`)??world.scoreboard.addObjective(`esploratori:rewards:${name}`, "esploratori:rewards");
    }
    static setKillTarget(typeIds){
        world.afterEvents.entityDie.subscribe(e=>{
            if (typeIds.includes(e.deadEntity.typeId)){

            }
        })
    }
    static setMineTarget(typeIds){

    }
    static setScoreTarget(){

    }

    fulfill(player){
        this.reward.release(player);
    }
}