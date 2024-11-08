//Hello!, are you interested in the code? 
//If you end up using any part of it, it would be very kind of you to give credit. 
//Thank you very much!

//Pupy200mine

import * as server from "@minecraft/server"
let cooldown = false

const lootrBlocksIds = ["minecraft:chest", "minecraft:barrel"]

const shulkerBoxTypes = [
    "minecraft:white_shulker_box",
    "minecraft:orange_shulker_box",
    "minecraft:magenta_shulker_box",
    "minecraft:light_blue_shulker_box",
    "minecraft:yellow_shulker_box",
    "minecraft:lime_shulker_box",
    "minecraft:pink_shulker_box",
    "minecraft:gray_shulker_box",
    "minecraft:light_gray_shulker_box",
    "minecraft:cyan_shulker_box",
    "minecraft:purple_shulker_box",
    "minecraft:blue_shulker_box",
    "minecraft:brown_shulker_box",
    "minecraft:green_shulker_box",
    "minecraft:red_shulker_box",
    "minecraft:black_shulker_box",
    "minecraft:undyed_shulker_box"
];

lootrBlocksIds.push(...shulkerBoxTypes)

server.world.beforeEvents.explosion.subscribe(result => {
    let blocks = result.getImpactedBlocks();
    let filteredBlocks = blocks.filter(block => {
        let byPlayer = false

        let locationsArray = String(server.world.getDynamicProperty("locations")).split("|")

        let locationString = JSON.stringify(block.location)

        if (locationsArray.includes(locationString)) {
            byPlayer = true
        }

        return !(lootrBlocksIds.includes(block.typeId)) || byPlayer;
    });
    result.setImpactedBlocks(filteredBlocks);
})

server.world.beforeEvents.playerInteractWithBlock.subscribe(result => {
    if (!lootrBlocksIds.includes(result.block.typeId)) { return; }
    let byPlayer = false

    let locationsArray = String(server.world.getDynamicProperty("locations")).split("|")

    let locationString = JSON.stringify(result.block.location)

    if (locationsArray.includes(locationString)) {
        byPlayer = true
    }

    let container = result.block.getComponent("minecraft:inventory").container;
    let entity = result.block.dimension.getEntitiesAtBlockLocation(result.block.center()).filter(entity => entity.typeId === "lootr:inventory" && entity.hasTag(result.player.id))
    //let byPlayer = result.block.dimension.getEntitiesAtBlockLocation(result.block.center()).some(entity => entity.typeId === "lootr:byplayer")

    //Si el cofre fue creado por un jugador, devolver
    if (byPlayer) { return }

    if (container.size == 54) {
        if (!result.player.hasTag("lootr:double_chest")) {
            server.system.run(() => {
                result.player.sendMessage({ "rawtext": [{ "translate": "lootr.double_chest" }] })
                result.player.addTag("lootr:double_chest")
            })
        }

        return
    }

    if (cooldown) { result.cancel = true; cooldown = false; return; }

    //if (result.block.below(1).typeId == "minecraft:hopper") server.system.run(() => { result.block.below(1).setType("minecraft:air") })

    //Si el jugador no tiene inventario propio en el cofre
    if (entity.length < 1) {
        cooldown = true
        server.system.run(() => {
            try {
                server.world.structureManager.delete("lootr_1:chest")
            } catch { }
            let structure = server.world.structureManager.createFromWorld("lootr_1:chest", result.player.dimension, result.block.location, result.block.location)
            structure.saveToWorld()

            let found = false

            //Advancements
            let count = result.player.getDynamicProperty("lootr:count");
            if (!count) count = 0;
            count++;
            result.player.setDynamicProperty("lootr:count", count);

            switch (count) {
                case 10:
                    server.world.sendMessage({ "rawtext": [{ "translate": "lootr.10loot", "with": [`${result.player.name}`] }] });
                    result.player.playSound("random.levelup");
                    break;
                case 25:
                    server.world.sendMessage({ "rawtext": [{ "translate": "lootr.25loot", "with": [`${result.player.name}`] }] });
                    result.player.playSound("random.levelup");
                    break;
                case 50:
                    server.world.sendMessage({ "rawtext": [{ "translate": "lootr.50loot", "with": [`${result.player.name}`] }] });
                    result.player.playSound("random.levelup");
                    break;
                case 100:
                    server.world.sendMessage({ "rawtext": [{ "translate": "lootr.100loot", "with": [`${result.player.name}`] }] });
                    result.player.playSound("random.levelup");
                    break;
            }

            let rotation = result.block.permutation.getAllStates()

            let degrees = "0_degrees";
            switch (rotation["facing_direction"]) {
                case 2:
                    degrees = "0_degrees";
                    break;
                case 3:
                    degrees = "180_degrees";
                    break;
                case 4:
                    degrees = "270_degrees";
                    break;
                case 5:
                    degrees = "90_degrees";
                    break;
            }

            try {
                server.world.structureManager.delete("lootr_1:block_below")
            } catch { }
            let block_below_structure = server.world.structureManager.createFromWorld("lootr_1:block_below", result.player.dimension, result.block.below(1).location, result.block.below(1).location)
            block_below_structure.saveToWorld()

            result.player.runCommand(`setblock ${result.block.below(1).location.x} ${result.block.below(1).location.y} ${result.block.below(1).location.z} air replace`)
            result.block.below(1).setType("hopper")
            server.system.runTimeout(() => {
                container = result.block.getComponent("minecraft:inventory").container;
                try {
                    result.block.getComponent("inventory").container.addItem(result.block.below(1).getComponent("inventory").container.getItem(0))
                } catch { }
                server.world.structureManager.place("lootr_1:block_below", result.block.dimension, result.block.below(1).location)

                let entity = result.block.dimension.spawnEntity("lootr:inventory", { x: result.block.x + 0.50, y: result.block.y, z: result.block.z + 0.50 })

                //Advancements
                server.system.runTimeout(() => {
                    try {
                        let first_chest = result.player.getDynamicProperty("lootr:first_chest");
                        let first_barrel = result.player.getDynamicProperty("lootr:first_barrel");
                        let first_shulker = result.player.getDynamicProperty("lootr:first_shulker");
                        //Chest
                        if (entity.hasTag("chest") && !first_chest) {
                            result.player.setDynamicProperty("lootr:first_chest", true)
                            server.world.sendMessage({ "rawtext": [{ "translate": "lootr.1chest", "with": [`${result.player.name}`] }] });
                            result.player.playSound("random.levelup");
                        }
                        else if (entity.hasTag("barrel") && !first_barrel) {
                            result.player.setDynamicProperty("lootr:first_barrel", true)
                            server.world.sendMessage({ "rawtext": [{ "translate": "lootr.1barrel", "with": [`${result.player.name}`] }] });
                            result.player.playSound("random.levelup");
                        }
                        else if (entity.hasTag("shulker") && !first_shulker) {
                            result.player.setDynamicProperty("lootr:first_shulker", true)
                            server.world.sendMessage({ "rawtext": [{ "translate": "lootr.1shulker", "with": [`${result.player.name}`] }] });
                            result.player.playSound("random.levelup");;
                        }
                    } catch { }
                }, 10)
                entity.addTag(result.player.id)
                result.player.playSound("note.bell")
                result.block.dimension.spawnParticle("lootr:lootr_chest_particle", result.block.center())
                result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.loot_changed", "with": [`${result.player.name}`] }] })
                entity.triggerEvent("lootr:add_collision")

                for (let i = 0; i < container.size; i++) {
                    let itemStack = container.getItem(i);
                    if (!itemStack) continue;

                    if (itemStack.typeId.startsWith("lootr:")) {
                        found = true
                        result.block.dimension.runCommandAsync(`structure load ${itemStack.typeId.split(":")[1]} ${result.block.location.x} ${result.block.location.y} ${result.block.location.z} ${degrees} none true true true`)
                        container.setItem(i, undefined)
                    }
                }

                for (let i = 0; i < container.size; i++) {
                    let itemStack = container.getItem(i);
                    if (!itemStack) continue;

                    entity.getComponent("minecraft:inventory").container.setItem(i, itemStack)
                }

                if (!found) {
                    result.block.dimension.runCommand(`setblock ${result.block.location.x} ${result.block.location.y} ${result.block.location.z} air replace`)
                    server.world.structureManager.place("lootr_1:chest", result.player.dimension, result.block.location)
                }
                cooldown = false
            }, 2)
        })
    }
    //De otro modo, cambiar al inventario del jugador
    else {
        server.system.run(() => {
            result.player.playSound("note.bell")
            result.block.dimension.spawnParticle("lootr:lootr_chest_particle", result.block.center())
            result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.loot_changed", "with": [`${result.player.name}`] }] })
            entity[0].triggerEvent("lootr:add_collision")
        })
    }
    result.cancel = true
})

server.world.beforeEvents.playerInteractWithEntity.subscribe(result => {
    if (result.target.typeId != "lootr:inventory") return

    let entity = result.target.dimension.getEntitiesAtBlockLocation(result.target.location).filter(entity => entity.typeId === "lootr:inventory" && entity.hasTag(result.player.id))

    if (cooldown) { result.cancel = true; cooldown = false; return; }

    if (entity.length < 1) {
        let count = result.player.getDynamicProperty("lootr:count");
        let found = false
        if (!count) count = 0;
        count++;
        result.player.setDynamicProperty("lootr:count", count);

        switch (count) {
            case 10:
                server.world.sendMessage({ "rawtext": [{ "translate": "lootr.10loot", "with": [`${result.player.name}`] }] });
                result.player.playSound("random.levelup");
                break;
            case 25:
                server.world.sendMessage({ "rawtext": [{ "translate": "lootr.25loot", "with": [`${result.player.name}`] }] });
                result.player.playSound("random.levelup");
                break;
            case 50:
                server.world.sendMessage({ "rawtext": [{ "translate": "lootr.50loot", "with": [`${result.player.name}`] }] });
                result.player.playSound("random.levelup");
                break;
            case 100:
                server.world.sendMessage({ "rawtext": [{ "translate": "lootr.100loot", "with": [`${result.player.name}`] }] });
                result.player.playSound("random.levelup");
                break;
        }

        cooldown = true
        server.system.run(() => {

            let below = result.target.dimension.getBlock({ x: result.target.location.x, y: result.target.location.y - 1, z: result.target.location.z })
            let this_block = result.target.dimension.getBlock({ x: result.target.location.x, y: result.target.location.y, z: result.target.location.z })
            let container = this_block.getComponent("minecraft:inventory").container;

            try {
                server.world.structureManager.delete("lootr_1:chest")
            } catch { }
            let structure = server.world.structureManager.createFromWorld("lootr_1:chest", result.player.dimension, this_block.location, this_block.location)
            structure.saveToWorld()

            let rotation = this_block.permutation.getAllStates()

            let degrees = "0_degrees";
            switch (rotation["facing_direction"]) {
                case 2:
                    degrees = "0_degrees";
                    break;
                case 3:
                    degrees = "180_degrees";
                    break;
                case 4:
                    degrees = "270_degrees";
                    break;
                case 5:
                    degrees = "90_degrees";
                    break;
            }

            try {
                server.world.structureManager.delete("lootr_1:block_below")
            } catch { }
            let block_below_structure = server.world.structureManager.createFromWorld("lootr_1:block_below", result.player.dimension, below.location, below.location)
            block_below_structure.saveToWorld()

            result.player.runCommand(`setblock ${below.location.x} ${below.location.y} ${below.location.z} air replace`)
            below.setType("hopper")
            server.system.runTimeout(() => {
                container = this_block.getComponent("minecraft:inventory").container;
                try {
                    this_block.getComponent("inventory").container.addItem(below.getComponent("inventory").container.getItem(0))
                } catch { }
                server.world.structureManager.place("lootr_1:block_below", result.block.dimension, result.block.below(1).location)

                let entity = result.player.dimension.spawnEntity("lootr:inventory", { x: this_block.x + 0.50, y: this_block.y, z: this_block.z + 0.50 })
                result.player.playSound("note.bell")
                result.block.dimension.spawnParticle("lootr:lootr_chest_particle", result.block.center())
                result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.loot_changed", "with": [`${result.player.name}`] }] })
                entity.addTag(result.player.id)
                entity.triggerEvent("lootr:add_collision")

                for (let i = 0; i < container.size; i++) {
                    let itemStack = container.getItem(i);
                    if (!itemStack) continue;

                    if (itemStack.typeId.startsWith("lootr:")) {
                        found = true
                        result.target.dimension.runCommandAsync(`structure load ${itemStack.typeId.split(":")[1]} ${this_block.location.x} ${this_block.location.y} ${this_block.location.z} ${degrees} none true true true`)
                        container.setItem(i, undefined)
                    }
                }


                for (let i = 0; i < container.size; i++) {
                    let itemStack = container.getItem(i);
                    if (!itemStack) continue;

                    entity.getComponent("minecraft:inventory").container.setItem(i, itemStack)
                }

                if (!found) {
                    this_block.dimension.runCommand(`setblock ${this_block.location.x} ${this_block.location.y} ${this_block.location.z} air replace`)
                    server.world.structureManager.place("lootr_1:chest", result.player.dimension, this_block.location)
                }
                cooldown = false
            }, 2)
        })
        result.cancel = true
    }
    else {
        if (result.target.typeId == "lootr:inventory" && result.target.hasTag(result.player.id)) {
            server.system.run(() => {
                entity.forEach(entity => {
                    entity.triggerEvent("lootr:remove_collision")
                })
            })
        }
        else {
            if (result.target.typeId == "lootr:inventory" && result.target.hasTag(result.player.id)) {
                server.system.run(() => {
                    entity[0].triggerEvent("lootr:remove_collision")
                })
            }
            else {
                server.system.run(() => {
                    let this_block = result.target.dimension.getBlock({ x: result.target.location.x, y: result.target.location.y, z: result.target.location.z })
                    this_block.dimension.spawnParticle("lootr:lootr_chest_particle", this_block.center())
                    result.player.playSound("note.bell")
                    result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.loot_changed", "with": [`${result.player.name}`] }] })
                    entity[0].triggerEvent("lootr:add_collision")
                    result.target.triggerEvent("lootr:remove_collision")
                })
                result.cancel = true
            }
        }
    }
})

server.world.beforeEvents.playerPlaceBlock.subscribe(result => {
    if (lootrBlocksIds.includes(result.permutationBeingPlaced.type.id)) {

        let locations = server.world.getDynamicProperty("locations") || "";

        let locationsArray = String(server.world.getDynamicProperty("locations")).split("|")

        let locationString = JSON.stringify(result.block.location);

        if (!locationsArray.includes(locationString)) {
            locations += locations ? `|${locationString}` : locationString;
            server.world.setDynamicProperty("locations", locations);
            // console.warn(`Location added: ${locationString}`);
        }
    }
})

server.world.afterEvents.playerBreakBlock.subscribe(result => {
    if (lootrBlocksIds.includes(result.brokenBlockPermutation.type.id)) {

        let locationsArray = String(server.world.getDynamicProperty("locations")).split("|");

        let locationString = JSON.stringify(result.block.location);

        if (locationsArray.includes(locationString)) {
            locationsArray = locationsArray.filter(item => item !== locationString);
            server.world.setDynamicProperty("locations", locationsArray.join("|"));
            // console.warn(`Location removed: ${locationString}`);
        }
    }
})

server.world.beforeEvents.playerPlaceBlock.subscribe(result => {
    let blocks = [];

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                // (0, 0, 0) se ignora
                if (dx !== 0 || dy !== 0 || dz !== 0) {
                    blocks.push(result.block.dimension.getBlock({
                        x: result.block.location.x + dx,
                        y: result.block.location.y + dy,
                        z: result.block.location.z + dz
                    }));
                }
            }
        }
    }

    blocks.forEach(block => {
        let byPlayer = false

        let locationsArray = String(server.world.getDynamicProperty("locations")).split("|")

        let locationString = JSON.stringify(block.location)

        if (locationsArray.includes(locationString)) byPlayer = true

        //let byPlayer = result.block.dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === "lootr:byplayer")
        if (lootrBlocksIds.includes(block.typeId) && !byPlayer) {
            server.system.run(() => {
                result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.deny" }] })
                result.player.playSound("note.bass")
            })
            result.cancel = true
        }
        else if ((result.permutationBeingPlaced.matches("minecraft:piston") || result.permutationBeingPlaced.matches("minecraft:sticky_piston")) && lootrBlocksIds.includes(block.typeId)) {
            server.system.run(() => {
                result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.deny.piston" }] })
                result.player.playSound("note.bass")
            })
            result.cancel = true
        }
        else if (lootrBlocksIds.includes(result.permutationBeingPlaced.type.id) && (block.typeId == "minecraft:piston" || block.typeId == "minecraft:sticky_piston")) {
            server.system.run(() => {
                result.player.onScreenDisplay.setActionBar({ "rawtext": [{ "translate": "lootr.deny.container" }] })
                result.player.playSound("note.bass")
            })
            result.cancel = true
        }
    })
})

server.world.beforeEvents.playerBreakBlock.subscribe(result => {
    let byPlayer = false

    let locationsArray = String(server.world.getDynamicProperty("locations")).split("|")

    let locationString = JSON.stringify(result.block.location)

    if (locationsArray.includes(locationString)) {
        byPlayer = true
    }

    if (byPlayer || !lootrBlocksIds.includes(result.block.typeId)) return
    else {
        let entities = result.block.dimension.getEntitiesAtBlockLocation(result.block.center()).filter(entity => entity.typeId === "lootr:inventory")
        if (result.player.isSneaking) {
            server.system.run(() => {
                try {
                    entities.forEach(entity => {
                        entity.triggerEvent("kill")
                        server.system.runTimeout(() => {
                            let entities = result.block.dimension.getEntitiesAtBlockLocation(result.block.location).filter(entity => entity.typeId === "lootr:nothing")
                            entities.forEach(entity => {
                                entity.triggerEvent("kill")
                            })
                        }, 2)
                    })
                } catch { }
                result.dimension.spawnParticle("lootr:lootr_chest_particle", result.block.center())
                //result.player.playSound("block.mud_bricks.break")
                result.block.dimension.runCommandAsync(`setblock ${result.block.location.x} ${result.block.location.y} ${result.block.location.z} air replace`)
                let entity = result.dimension.getEntitiesAtBlockLocation(result.block.center()).filter(entity => entity.typeId == "lootr:inventory")
                if (result.player.getGameMode() != server.GameMode.creative) {
                    try {
                        switch (entity[0].getComponent("mark_variant").value) {
                            case 0:
                                result.dimension.spawnItem(new server.ItemStack("minecraft:chest", 1), result.block.center())
                                break
                            case 1:
                                result.dimension.spawnItem(new server.ItemStack("minecraft:barrel", 1), result.block.center())
                                break
                            case 2:
                                result.dimension.spawnItem(new server.ItemStack(result.block.typeId, 1), result.block.center())
                                break
                        }
                    } catch (e) {
                        try {
                            result.dimension.spawnItem(new server.ItemStack(result.block.typeId, 1), result.block.center())
                        } catch { }
                    }
                }
            })
        }
        else {
            server.system.run(() => {
                result.player.sendMessage({ "rawtext": [{ "translate": "lootr.sneaking" }] })
            })
        }
    }
    result.cancel = true
})

server.world.afterEvents.entityHitEntity.subscribe(result => {
    if (result.hitEntity.typeId == "lootr:inventory") {
        if (result.damagingEntity.isSneaking) {
            let location = result.hitEntity.location
            let entities = result.hitEntity.dimension.getEntitiesAtBlockLocation(result.hitEntity.location).filter(entity => entity.typeId === "lootr:inventory")
            try {
                entities.forEach(entity => {
                    entity.triggerEvent("kill")
                    server.system.runTimeout(() => {
                        let entities = result.damagingEntity.dimension.getEntitiesAtBlockLocation(location).filter(entity => entity.typeId === "lootr:nothing")
                        entities.forEach(entity => {
                            entity.triggerEvent("kill")
                        })
                    }, 2)
                })
            } catch { }
            result.damagingEntity.dimension.spawnParticle("lootr:lootr_chest_particle", result.hitEntity.location)
            //result.damagingEntity.playSound("block.mud_bricks.break")
            result.damagingEntity.dimension.runCommandAsync(`setblock ${result.hitEntity.location.x} ${result.hitEntity.location.y} ${result.hitEntity.location.z} air replace`)
            let this_block = result.hitEntity.dimension.getBlock({ x: result.hitEntity.location.x, y: result.hitEntity.location.y, z: result.hitEntity.location.z })
            let entity = result.hitEntity.dimension.getEntitiesAtBlockLocation(this_block.center()).filter(entity => entity.typeId == "lootr:inventory")
            if (result.damagingEntity.getGameMode() != server.GameMode.creative) {
                try {
                    switch (entity[0].getComponent("mark_variant").value) {
                        case 0:
                            result.damagingEntity.dimension.spawnItem(new server.ItemStack("minecraft:chest", 1), this_block.center())
                            break
                        case 1:
                            result.damagingEntity.dimension.spawnItem(new server.ItemStack("minecraft:barrel", 1), this_block.center())
                            break
                        case 2:
                            result.damagingEntity.dimension.spawnItem(new server.ItemStack(this_block.typeId, 1), this_block.center())
                            break
                    }
                } catch (e) {
                    try {
                        result.damagingEntity.dimension.spawnItem(new server.ItemStack(this_block.typeId, 1), this_block.center())
                    } catch { }
                }
            }
        }
        else {
            server.system.run(() => {
                result.damagingEntity.sendMessage({ "rawtext": [{ "translate": "lootr.sneaking" }] })
            })
        }
    }
})

server.world.afterEvents.entitySpawn.subscribe(result => {
    if (result.entity.typeId == "lootr:inventory") {
        if (result.entity.dimension.getBlock(result.entity.location).typeId == "minecraft:chest") { result.entity.triggerEvent("chest"); result.entity.addTag("chest") }
        if (result.entity.dimension.getBlock(result.entity.location).typeId == "minecraft:barrel") { result.entity.triggerEvent("barrel"); result.entity.addTag("barrel") }

        if (shulkerBoxTypes.includes(result.entity.dimension.getBlock(result.entity.location)?.typeId)) {
            result.entity.triggerEvent("shulker");
            result.entity.addTag("shulker")
        }
    }
})

server.world.afterEvents.pistonActivate.subscribe(result => {
    let blocks = [];

    for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
            for (let dz = -2; dz <= 2; dz++) {
                // No agregar el bloque central (0, 0, 0) a la lista
                if (dx !== 0 || dy !== 0 || dz !== 0) {
                    blocks.push(result.block.dimension.getBlock({
                        x: result.block.location.x + dx,
                        y: result.block.location.y + dy,
                        z: result.block.location.z + dz
                    }));
                }
            }
        }
    }

    blocks.forEach(block => {
        if (lootrBlocksIds.includes(block.typeId)) {
            result.piston.block.dimension.runCommand(`setblock ${result.piston.block.location.x} ${result.piston.block.location.y} ${result.piston.block.location.z} air destroy`)
        }
    })
})