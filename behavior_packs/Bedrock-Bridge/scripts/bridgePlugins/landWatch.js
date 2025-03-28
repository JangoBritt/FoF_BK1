/**
 * LandWatch - BedrockBridge addon
 * @version 1.0.0
 * This bridge-addon adds the possbility to send messages if a player trespasses on a certain area.
 * 
 * by InnateAlpaca (https://github.com/InnateAlpaca)
 */

import { system, world } from "@minecraft/server"
import { bridge, bridgeDirect, database } from "../addons"

const watchAreas = database.makeTable("WatchArea")
const inlist = new Map()

bridge.events.bridgeInitialize.subscribe((e)=>{
    e.registerAddition("discord_direct")
})

bridgeDirect.events.directInitialize.subscribe(()=>{
    console.log("ready")
    bridgeDirect.sendMessage("here we go...")
})

const playerMarks = new Map();

world.getAllPlayers().forEach(p => playerMarks.set(p.id, []));
world.afterEvents.playerJoin.subscribe(e=>playerMarks.set(e.playerId, []));
world.afterEvents.playerLeave.subscribe(e=>playerMarks.delete(e.playerId));


bridge.bedrockCommands.registerAdminCommand("mark", (player)=>{
    const markRecord = playerMarks.get(player.id)

    switch (markRecord.length){
        case 0: {
            markRecord.push(player.location)
            player.sendMessage("§eNew location marked.")
            break
        }
        case 1: {
            markRecord.push(player.location)
            player.sendMessage("§eNew location marked.\n§rArea selected.")
            break
        }
        default: {
            playerMarks.set(player.id, [player.location])
            player.sendMessage("§eSelected area reset. New location marked.")
        }
    }    
}, "mark the location you are standing as edge of the area to select.")

bridge.bedrockCommands.registerAdminCommand("selectedArea", (player) => {
    const markRecord = playerMarks.get(player.id)

    if (markRecord.length === 2) {        
        player.sendMessage(`§eCurrently selected area is the rectangle with edges (${Math.floor(markRecord[0].x)}, ${Math.floor(markRecord[0].z)}) and (${Math.floor(markRecord[1].x)}, ${Math.floor(markRecord[1].z)})`)
    }
    else {
        player.sendMessage("§cYou haven't fully marked an area. Please make sure to run 'mark' twice.")
    }

}, "shows the coordinates of the area you have selected by running 'mark' command.")

bridge.bedrockCommands.registerAdminCommand("watchArea", (player, areaName, ...allowList)  => {
    const markRecord = playerMarks.get(player.id)

    if (markRecord.length !== 2) {
        player.sendMessage("§cYou haven't fully marked an area. Please make sure to run 'mark' twice.");
        return;
    }
    
    if (watchAreas.has(areaName.toString())){
        player.sendMessage("§cThere already is an area by this name. If you want to reset it you should first delete it.");
        return;
    }

    watchAreas.set(areaName.toString(), {
        p1: { x: Math.min(markRecord[0].x, markRecord[1].x), z: Math.min(markRecord[0].z, markRecord[1].z) },
        p2: { x: Math.max(markRecord[0].x, markRecord[1].x), z: Math.max(markRecord[0].z, markRecord[1].z) },
        ignoreNames: allowList,
        ignoreTags: []
    })
    
    player.sendMessage(`§eYou added the new area "${areaName}".`);

}, `start watching this area. If someone enters they will be reported on discord. Usage: §o${bridge.bedrockCommands.prefix}watchArea <area name> <exclude username 1> <exclude username 2> ...`)

bridge.bedrockCommands.registerAdminCommand("listWatchAreas", (player) => {
    let message = "Active watch areas\n";
    for (const [name, area] of watchAreas.entries()){
        message += `- ${name}: (${Math.floor(area.p1.x)}, ${Math.floor(area.p1.z)}) (${Math.floor(area.p2.x)}, ${Math.floor(area.p2.z)})\n`
    }

    player.sendMessage(message);

}, "List all the watch areas.")

bridge.bedrockCommands.registerAdminCommand("removeWatchArea", (player, name) => {
    if (watchAreas.has(name.toString())){
        watchAreas.delete(name.toString());
        player.sendMessage(`§eYou deleted "${name}".`)
    }
    else {
        player.sendMessage(`§cNo record found for area "${name}".`);
    }
   
}, "Deletes a watch area. Args: <area name>")

function* areaWatcher(){
    for (const [name, area] of watchAreas.entries()){
        const badPlayers = world.getPlayers({ location: { y: 0, ...area.p1 }, volume: { y: 300, ...area.p2 }, excludeNames: area.ignoreNames, excludeTags:area.ignoreTags})
        const list = inlist.get(name)??[];
        
        for (const username of list) {
            if (!badPlayers.find(p=>p.name===username)){
                
            }
        }

        for (const player of badPlayers){
            if (!list.includes(player.id)){
                bridgeDirect.sendEmbed({
                    title: "Player detected",
                    type: 'rich',
                    description: `${player.name}* was detected inside the area "${name}"`,
                    color: "0xFF6347"	
                }, "LandWatcher")
                list.push(player.id)
            }
            // else player was already reported
        }
        inlist.set(name, list);
        
        yield;
       
    }
}

system.run(()=>{
    system.runJob(areaWatcher)
})