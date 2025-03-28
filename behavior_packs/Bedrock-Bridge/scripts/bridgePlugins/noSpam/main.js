/**
 * Esploratori NoSpam for BedrockBridge, v1.0.1
 * 
 * This bridge-plugin will let you moderate chat
 * 
 * From Settings.js you can as well setup a lot of other options! Even how chat should appear (chat template)!
 * You'll get of course discord messages formatted with discord-roles.
 * 
 * by InnateAlpaca102
 */

import { world } from '@minecraft/server';
import { bridge } from '../../addons';
import { settings } from './settings';
import { SpamManager } from "./SpamManager"

const mcspam = new SpamManager(settings.slowmode_minecraft);

world.beforeEvents.chatSend.subscribe(e=>{
    if (mcspam.allowRate(e.id, e.message)>0){
        e.cancel=true;
        e.sender.sendMessage("§cSlow down, you cannot send too many messages.");
        return;
    }
    
    if (settings.no_k){
        e.message=e.message.replace("§k", "§o");
    }
    if (settings.resize_minecraft>0){
        e.message=mcspam.resize(e.message, settings.resize_minecraft);
    }
    if (settings.censor_minecraft){
        console.log(dc_mc_spam.censor(e.message))
        e.message=mcspam.censor(e.message);
    }
})

const mc_dc_spam = new SpamManager(settings.slowmode_minecraft_to_discord);

bridge.events.chatUpStream.subscribe((e, player)=>{
    if (settings.slowmode_minecraft_to_discord>0){
        if (mc_dc_spam.allowRate(player.id, e.message)>0){
            e.cancel=true;
            return;
        }
    }
    if (settings.resize_minecraft_to_discord>0){
        e.message=mc_dc_spam.resize(e.message, settings.resize_minecraft_to_discord);
    }
    if (settings.censor_minecraft_to_discord){
        e.message=mc_dc_spam.censor(e.message);
    }
})

const dc_mc_spam = new SpamManager(settings.slowmode_discord_to_minecraft);

bridge.events.chatDownStream.subscribe((e)=>{
    if (settings.slowmode_discord_to_minecraft>0){
        if (dc_mc_spam.allowRate(e.author, e.message)>0){
            e.cancel=true;
            return;
        }
    }
    if (settings.resize_discord_to_minecraft>0){
        e.message=dc_mc_spam.resize(e.message, settings.resize_discord_to_minecraft);
    }
    if (settings.censor_discord_to_minecraft){
        e.message=dc_mc_spam.censor(e.message);
    }
})