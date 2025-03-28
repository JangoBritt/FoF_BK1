import { bridge } from "../../addons";
import { GameMode, world, system } from "@minecraft/server";

const limbo_tag = "limbo:locked";

function lock(player){
    player.runCommand("inputpermission set @s movement disabled");
    player.runCommand("inputpermission set @s camera disabled");
    player.setGameMode(GameMode.adventure);
}
function unlock(player){
    player.runCommand("inputpermission set @s movement enabled");
    player.runCommand("inputpermission set @s camera enabled");
    player.setGameMode(GameMode.survival);
}

world.afterEvents.playerSpawn.subscribe(e=>{
    if (e.initialSpawn) return;
    const player = e.player;

    if (!player.dcNametag){ //player is not linked
        player.sendMessage(`Welcome! In order to play on this server you need to link your account. Please run ${bridge.bedrockCommands.prefix}linkdc`);
        lock(player)
        player.addTag(limbo_tag);
    }
})

system.runInterval(()=>{
    for (const player of world.getPlayers({tags:[limbo_tag]})){
        if (player.dcNametag){
            unlock(player);
            player.removeTag(limbo_tag);
            player.sendMessage(`Congratulations! You may now play on the server!`);
        }
    }
}, 20)