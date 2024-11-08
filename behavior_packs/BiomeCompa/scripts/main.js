import * as server from "@minecraft/server"
import { CustomForm } from "customForm.js";

import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui'

let biomes = server.BiomeTypes.getAll().sort((a, b) => {
    return a.id.localeCompare(b.id);
});

export let interval
let formattedBiomeName = []

let addonVersion = "V3.0.0"

server.world.afterEvents.itemStartUse.subscribe(result => {
    result.itemStack.getTags().forEach(tag => {
        if (tag == "biomecompass" && !result.source.isSneaking) {
            biomeCompass(result.source, "")
        }
        else if (tag == "biomecompass" && result.source.isSneaking) {
            try { server.system.clearRun(interval) } catch (e) { /*console.warn(e)*/ }

            result.source.setDynamicProperty("biomecompassName", "null")
            result.source.setDynamicProperty("biomecompassActual", "null")

            result.source.onScreenDisplay.setActionBar("§aBiome Compass: §cSearch Stopped")
            let inventory = result.source.getComponent("minecraft:inventory").container;
            for (let i = 0; i < inventory.size; i++) {
                let itemStack = inventory.getItem(i);
                if (itemStack === undefined) continue;
                itemStack.getTags().forEach(tag => {
                    if (tag == "biomecompass") {
                        inventory.setItem(i, new server.ItemStack("biomecompass:biomecompass_00", itemStack.amount));
                    }
                })
            }
            return
        }
    })
})

/**
* @param {server.Player} player
* @param {string} filter
*/
export function biomeCompass(player, filter) {
    let biomesNames = [];
    formattedBiomeName = []

    const form = new CustomForm()
    form.title("Search Biome");
    form.body("§aCustom form made by §6§ldrag0nd. §r§aThanks ^^\n§esome tweaks made by me")
    form.button("§f§lBiomes", `§b§6§lAbout the addon`, "minecraft:diamond");

    for (let i = 0; i < biomes.length; i++) {
        let formattedName = biomes[i].id.split(":")[1]
            .replace(/_/g, " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        // formattedBiomeName.push(formattedName)

        if (!filter || formattedName.toLowerCase().includes(filter.toLowerCase())) {
            biomesNames.push(biomes[i].id);
            formattedBiomeName.push(formattedName)
            form.button("§f§lBiomes", `§b§l${formattedName}`, "minecraft:diamond");
        }
    }
    form.button("§e§lFilter by name", "§e§lFilter by name")
    form.button("§c§lStop search", "c§lStop search")

    form.show(player).then(response => {
        if (response.canceled) return;
        // console.warn("test")

        if (response.selection == 0) {
            const actionForm = new ActionFormData()
                .title("§a§lBiome Compass")
                .body(`§aThank you for downloading Biome Compass\n§e§oCurrent version:§r§d ${addonVersion}\n§cHighly inspired by the Minecraft Java mod §2§lNature's Compass.`)
                .button("accessibility.button.back", "textures/ui/exit")

            actionForm.show(player).then(response => {
                if (response.canceled) return
                if (response.selection == 0) biomeCompass(player, "")
            })

            return
        }

        // console.warn(response.selection)
        // return

        let actualBiome = response.selection - 1

        try { server.system.clearRun(interval) } catch (e) { /*console.warn(e)*/ }

        let biomeLocation = player.dimension.findClosestBiome(player.location, biomesNames[actualBiome])

        if (biomeLocation) {
            // player.getTags().forEach(tag => {
            //     if (tag.startsWith("biomecompass")) {
            //         player.removeTag(tag)
            //     }
            // })
            player.setDynamicProperty("biomecompassName", biomesNames[actualBiome])
            player.setDynamicProperty("biomecompassActual", actualBiome)
            // player.addTag(`biomecompassName:${biomesNames[actualBiome]}`)
            // player.addTag(`biomecompassActual:${actualBiome}`)

            compassInterval(player, biomesNames[actualBiome], actualBiome)
        }
        else {
            player.setDynamicProperty("biomecompassName", "null")
            player.setDynamicProperty("biomecompassActual", "null")

            player.sendMessage({ "rawtext": [{ "text": "§c" }, { "translate": "commands.locate.biome.fail", "with": [`${biomesNames[actualBiome]}`] }] })
            let inventory = player.getComponent("minecraft:inventory").container;
            for (let i = 0; i < inventory.size; i++) {
                let itemStack = inventory.getItem(i);
                if (itemStack === undefined) continue;
                itemStack.getTags().forEach(tag => {
                    if (tag == "biomecompass") {
                        inventory.setItem(i, new server.ItemStack("biomecompass:biomecompass_00", itemStack.amount));
                    }
                })
            }
        }
    })
}

server.world.afterEvents.playerDimensionChange.subscribe(result => {
    try { server.system.clearRun(interval) } catch (e) { /*console.warn(e)*/ }

    if (result.player.getDynamicProperty("biomecompassName") == "null") return

    result.player.setDynamicProperty("biomecompassName", "null")
    result.player.setDynamicProperty("biomecompassActual", "null")

    let inventory = result.player.getComponent("inventory").container
    let hasCompass = false

    for (let i = 0; i < inventory.size; i++) {
        let itemStack = inventory.getItem(i);
        if (itemStack === undefined) continue;
        itemStack.getTags().forEach(tag => {
            if (tag == "biomecompass") {
                hasCompass = true
            }
        })
    }

    if (hasCompass) {
        result.player.onScreenDisplay.setActionBar("§aBiome Compass: §cSearch Stopped")
    }

    inventory = result.player.getComponent("minecraft:inventory").container;
    for (let i = 0; i < inventory.size; i++) {
        let itemStack = inventory.getItem(i);
        if (itemStack === undefined) continue;
        itemStack.getTags().forEach(tag => {
            if (tag == "biomecompass") {
                inventory.setItem(i, new server.ItemStack("biomecompass:biomecompass_00", itemStack.amount));
            }
        })
    }
    return
})

// server.system.afterEvents.scriptEventReceive.subscribe(result => {

//     console.warn(result.sourceEntity.getDynamicProperty("biomecompassName"))
//     console.warn(result.sourceEntity.getDynamicProperty("biomecompassActual"))
// })

server.world.afterEvents.playerSpawn.subscribe(result => {

    let biomeName = result.player.getDynamicProperty("biomecompassName")
    let actualBiome = result.player.getDynamicProperty("biomecompassActual")

    if (biomeName === "null" || actualBiome === "null"
        || !biomeName || !actualBiome) { return }

    //Re-search the biome once the player has rejoined the biome
    let inventory = result.player.getComponent("inventory").container
    let hasCompass = false

    for (let i = 0; i < inventory.size; i++) {
        let itemStack = inventory.getItem(i);
        if (itemStack === undefined) continue;
        itemStack.getTags().forEach(tag => {
            if (tag == "biomecompass") {
                hasCompass = true
            }
        })
    }

    if (hasCompass) {
        result.player.onScreenDisplay.setActionBar("§aBiome Compass: §2Updating compass...")
    }

    server.system.runTimeout(() => {
        for (let i = 0; i < biomes.length; i++) {
            let formattedName = biomes[i].id.split(":")[1]
                .replace(/_/g, " ")
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            formattedBiomeName.push(formattedName)
        }
        // console.warn(result.player.getDynamicProperty("biomecompassActual"))
        // console.warn(result.player.getDynamicProperty("biomecompassName"))

        // result.player.getTags().forEach(tag => {
        //     const [prefix, ...valueParts] = tag.split(':');
        //     const value = valueParts.join(':');

        //     if (prefix === "biomecompassName") {
        //         biomeName = value;
        //     } else if (prefix === "biomecompassActual") {
        //         actualBiome = value;
        //     }
        // });
        compassInterval(result.player, biomeName, actualBiome)
    }, 100)
})

function compassInterval(player, biomeName, actualBiome) {
    let biomeLocation = player.dimension.findClosestBiome(player.location, biomeName)
    interval = server.system.runInterval(() => {
        //Rotacion hacia el bioma:
        let dx = biomeLocation.x - player.location.x;
        let dz = biomeLocation.z - player.location.z;

        let angleToBiome = Math.atan2(dz, dx) * (180 / Math.PI);

        if (angleToBiome < 0) {
            angleToBiome += 360;
        }
        2
        let rotationNeeded = angleToBiome - player.getRotation().y - 90;

        if (rotationNeeded > 180) {
            rotationNeeded -= 360;
        } else if (rotationNeeded < -180) {
            rotationNeeded += 360;
        }

        //console.warn(rotationNeeded.toFixed(2))

        let inventory = player.getComponent("minecraft:inventory").container;
        for (let i = 0; i < inventory.size; i++) {
            let itemStack = inventory.getItem(i);
            if (itemStack === undefined) continue;
            itemStack.getTags().forEach(tag => {
                if (tag == "biomecompass") {
                    let index = Math.floor((rotationNeeded + 180) / 11.25);
                    if (index < 0) {
                        index = 0;
                    } else if (index > 31) {
                        index = 31;
                    }
                    let itemName = `biomecompass:biomecompass_${index.toString().padStart(2, '0')}`;
                    let item = new server.ItemStack(itemName, itemStack.amount);
                    item.setLore([biomeName])
                    inventory.setItem(i, item)
                }
            })
        }

        let totalDistance = Math.sqrt(
            Math.pow(biomeLocation.x - player.location.x, 2) +
            Math.pow(biomeLocation.y - player.location.y, 2) +
            Math.pow(biomeLocation.z - player.location.z, 2)
        );
        player.getComponent("minecraft:inventory").container.getItem(player.selectedSlotIndex)?.getTags().forEach(tag => {
            if (tag == "biomecompass") {
                player.onScreenDisplay.setActionBar(`§2Biome:§r ${biomeName} \n§6In:§r ${biomeLocation.x.toFixed(0)}, ${biomeLocation.z.toFixed(0)} \n§3Distance:§r ${totalDistance.toFixed(0)} Blocks \n§cResults may not be 100% accurate.`)
            }
        })
    }, 1)
}