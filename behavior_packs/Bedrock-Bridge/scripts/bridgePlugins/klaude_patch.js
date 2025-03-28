//path to remove duplicate join logs

import { bridge } from '../addons';
import { world } from '@minecraft/server';

const joined_players = []

bridge.events.playerJoinLog.subscribe((e, player)=>{
    if (joined_players.includes(player.name)){
        e.cancel=true;
    }
    else {
        joined_players.push(player.name);
    }
})

world.afterEvents.playerLeave.subscribe(e=>{
    if (joined_players.includes(e.playerName)){
        joined_players.slice(joined_players.indexOf(e.playerName), 1);
    }
})

console.log("[BedrockBridge] klaude's patch started.");