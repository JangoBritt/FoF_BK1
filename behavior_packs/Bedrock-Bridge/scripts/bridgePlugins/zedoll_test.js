import { bridge } from '../addons';
import { world } from "@minecraft/server"

const imageMap = {
    "admin": '',
    "developer": ''
}

bridge.bedrockCommands.registerCommand("tagBelowName", (caller, player, text)=>{
    const target_player = player.readPlayer();
    if (!target_player){ // target player not online, or wrong username used
        return caller.sendMessage("§cTarget user not found");
    }
    if (!(text.toString() in imageMap)){
        return caller.sendMessage("§cYou cannot set this text");
    }

    // Now it was all good... lets do the logice here
    system.run(()=>{
        target_player.addTag("tag_name:"+text);
        target_player.nameTag=target_player.name+"\n"+imageMap[text.toString()];
        caller.sendMessage("§eYou succesfully set the nametag of this user.")
    })
})

world.afterEvents.playerSpawn.subscribe(e=>{ //reset the tagthingy when player logs in
    if (e.initialSpawn){
       const tag = e.player.getTags().find(t=>t.startsWith("tag_name:"))?.slice(10);
        if (tag){
            e.player.nameTag=e.player.name+"\n"+imageMap[tag];
        }
    }
})