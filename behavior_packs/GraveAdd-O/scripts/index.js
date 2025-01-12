import { world, EquipmentSlot, ItemStack, system, MolangVariableMap } from "@minecraft/server"
const equipmentSlots = [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Offhand]

const graves = [
    "effect99:grave",
    "effect99:wooden_grave",
    "effect99:stone_grave",
    "effect99:stone_slab_grave",
    "effect99:stone_cross_grave",
    "effect99:blackstone_grave",
    "effect99:golden_blackstone_grave",
    "effect99:golden_cross_netherite_grave",
    "effect99:golden_netherite_grave"
]

const worldTick = () => system.run(() => {
    if (system.currentTick % 5 === 0) {
        for (const player of world.getAllPlayers()) {
            const inventory = player.getComponent('inventory').container
            const item = inventory.getItem(player.selectedSlotIndex)

            try {
                if (item.typeId === 'effect99:key' && item.getLore()[0]) {
                    let { x, y, z } = player.location
                    x -= 0.5; y -= 0.5; z -= 0.5
                    const coords = item.getLore()[0].match(/-?\d+/g)
                    if (coords && coords.length === 4) {
                        const dx = parseInt(coords[1])
                        const dy = parseInt(coords[2])
                        const dz = parseInt(coords[3])

                        const distance = Math.sqrt((x - dx) ** 2 + (y - dy) ** 2 + (z - dz) ** 2)
                        const dLore = item.getLore()[1]
                        if (dLore.slice(4) === player.dimension.id) {
                            player.onScreenDisplay.setActionBar(`§pPlace of death: §c${dx}, ${dy}, ${dz} \n§7Block distance: §f${(distance - 0.25).toFixed(2)}`)
                        } else player.onScreenDisplay.setActionBar(`§pGo to the dimension: §7${dLore.split(":")[1].slice(0, 1).toUpperCase() + dLore.split(":")[1].slice(1).replace(/_/g, " ")}`)

                        if (distance <= 6 && !graves.includes(player.dimension.getBlock({ x: dx, y: dy, z: dz }).typeId) && dLore.slice(4) === player.dimension.id) {
                            inventory.setItem(player.selectedSlotIndex, undefined)
                            world.playSound('random.break', { x, y, z }, { volume: 0.5 })
                        }
                    }
                }
            } catch (e) { }
        }
    }
    worldTick()
})
worldTick()

system.afterEvents.scriptEventReceive.subscribe(e => {
    if (e.id === "grave:model") {
        e.sourceEntity.runCommand(`setblock ~ ~ ~ ${graves[e.sourceEntity.getProperty("grave:model")]} ["block:destructible":1]`)
    }
})

world.afterEvents.itemStartUseOn.subscribe(i => {
    try {
        const block = i.block
        if (graves.includes(block.typeId)) {
            breakGrave(i.source, block)
        }
    } catch (e) { }
})

world.afterEvents.entityHitBlock.subscribe(e => {
    try {
        const block = e.hitBlock
        if (graves.includes(block.typeId)) {
            breakGrave(e.damagingEntity, block)
        }
    } catch (e) { }
})

function breakGrave(player, block) {
    const inventory = player.getComponent('inventory').container
    const item = inventory.getItem(player.selectedSlotIndex)

    if (item && item.typeId === 'effect99:key') {
        const { x, y, z } = block.location
        const dimension = player.dimension
        let thereIsEntity = false

        let coords = []
        try { coords = item.getLore()[0].match(/-?\d+/g) } catch (e) { }

        if (coords.length === 4) {
            const dx = parseInt(coords[1])
            const dy = parseInt(coords[2])
            const dz = parseInt(coords[3])
            let isEmpty = true
            
            for (const entity of dimension.getEntitiesAtBlockLocation({ x, y, z })) {
                if (entity.typeId === 'entity:grave_inventory') {
                    thereIsEntity = true
                    if (entity.getTags().some(f => { return f === player.id })) {
                        if (dx === x && dy === y && dz === z && item.getLore()[1].slice(4) === dimension.id) {
                            entity.triggerEvent("spawnItem")
                            dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`)

                            world.playSound('random.break', { x, y, z }, { volume: 0.5 })
                            world.playSound('block.end_portal.spawn', { x, y, z }, { pitch: 1.5 })

                            for (let i = 0; i < 12; i++) {
                                dimension.spawnParticle('effect99:souls', { x: x + 0.5, y: y + 0.5, z: z + 0.5 }, new MolangVariableMap())
                            }
                            inventory.setItem(player.selectedSlotIndex, undefined)
                        }
                        else player.sendMessage('§cYou have the wrong key!')
                    } else player.sendMessage('§pYou are not the owner of the gravestone.')
                    isEmpty = false
                }
            }
            if (isEmpty && dx === x && dy === y && dz === z && item.getLore()[1].slice(4) === dimension.id) {
                world.playSound('random.break', { x, y, z }, { volume: 0.5 })
                inventory.setItem(player.selectedSlotIndex, undefined)
            }
        } else for (const entity of dimension.getEntitiesAtBlockLocation({ x, y, z })) {
            if (entity.typeId === 'entity:grave_inventory') {
                thereIsEntity = true
                if (entity.getTags().some(f => { return f === player.id })) {
                    world.playSound('random.pop', { x, y, z })
                    item.setLore([`§r§9Place of death: §c${x}, ${y}, ${z}`, `§r§8${dimension.id}`])
                    inventory.setItem(player.selectedSlotIndex, item)
                } 
                else player.onScreenDisplay.setActionBar('§pYou are not the owner of the gravestone.')
                break
            }
        }
        if (!thereIsEntity) {
            block.setPermutation(block.permutation.withState("block:destructible", 0))
            player.onScreenDisplay.setActionBar('§7Gravestone unlocked!')
        }
    }
    else if (player.hasTag('admin')) {
        const { x, y, z } = block.location
        const dimension = player.dimension
        let thereIsEntity = false

        for (const entity of dimension.getEntitiesAtBlockLocation({ x, y, z })) {
            if (entity.typeId === 'entity:grave_inventory') {
                thereIsEntity = true
                entity.triggerEvent("spawnItem")
                dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`)
                world.playSound('random.break', { x, y, z }, { volume: 0.5 })
                world.playSound('block.end_portal.spawn', { x, y, z }, { pitch: 1.5 })

                for (let i = 0; i < 12; i++) {
                    dimension.spawnParticle('effect99:souls', { x: x + 0.5, y: y + 0.5, z: z + 0.5 }, new MolangVariableMap())
                }
            }
        }
        if (!thereIsEntity) {
            block.setPermutation(block.permutation.withState("block:destructible", 0))
            player.onScreenDisplay.setActionBar('§7Gravestone unlocked!')
        }
        
    } 
    else player.onScreenDisplay.setActionBar('You need a key')
}

world.afterEvents.entityDie.subscribe(e => {
    try {
        const entity = e.deadEntity
        const dimension = entity?.dimension

        if (entity?.typeId === 'minecraft:player') {
            let { x, y, z } = entity.location
            x = Math.floor(x) + 0.5; y = (dimension.id === 'minecraft:the_end') ? Math.max(Math.floor(y), 1) : Math.floor(y); z = Math.floor(z) + 0.5
            let block = dimension.getBlock({ x, y, z })
            if (dimension.id === 'minecraft:the_end') {
                dimension.runCommand(`fill ${x + 1} 0 ${z + 1} ${x - 1} 0 ${z - 1} minecraft:end_stone`)
            }
            let setLocation = { x, y, z }
            if (graves.includes(block.typeId) || block.typeId === 'minecraft:end_portal_frame') {
                function newLocation({ x, y, z }) {
                    const locations = [{ x: x + 1, y, z }, { x: x - 1, y, z }, { x, y, z: z + 1 }, { x, y, z: z - 1 }, { x: x + 1, y, z: z + 1 }, { x: x - 1, y, z: z - 1 }, { x: x - 1, y, z: z + 1 }, { x: x + 1, y, z: z - 1 }]
                    const graveFounds = []
                    let notFound = true

                    for (const { x, y, z } of locations) {
                        const isGrave = dimension.getBlock({ x, y, z }).typeId
                        if (!graves.includes(isGrave) && isGrave != 'minecraft:end_portal_frame') {
                            setLocation = { x, y, z }
                            notFound = false
                            break
                        }
                        else { graveFounds.push({ x, y, z }) }
                    }
                    if (notFound) {
                        newLocation(graveFounds[Math.floor(Math.random() * graveFounds.length)])
                    }
                }
                newLocation({ x, y, z })
            }
            else if (block.typeId === 'minecraft:lava' || block.typeId === 'minecraft:flowing_lava') {
                entity.runCommand(`fill ~1 ~1 ~1 ~-1 ~-1 ~-1 magma replace lava`)
                entity.runCommand(`fill ~1 ~1 ~1 ~-1 ~-1 ~-1 magma replace flowing_lava`)
            }
            x = setLocation.x; y = setLocation.y; z = setLocation.z;
            block = dimension.getBlock({ x, y, z })
            
            const inventory = entity.getComponent("inventory").container
            const graveEntity = dimension.spawnEntity('entity:grave_inventory', { x, y, z })
            const graveInventory = graveEntity.getComponent("inventory").container
            graveEntity.nameTag = `§c${entity.nameTag}§r \n R.I.P`
            graveEntity.addTag(entity.id)

            if (block.typeId != 'minecraft:air') {
                graveEntity.runCommand(`setblock ~ ~ ~ air destroy`)
            }
            const playerLevel = entity.addLevels(0)
            const graveRank = playerLevel < 12 ? 1 : playerLevel < 25 ? 2 : playerLevel < 37 ? 3 : playerLevel < 50 ? 4 : playerLevel < 62 ? 5 : playerLevel < 75 ? 6 : playerLevel < 87 ? 7 : playerLevel < 100 ? 8 : 8
            dimension.setBlockType({ x, y, z }, graves[graveRank])
            graveEntity.setProperty("grave:model", graveRank)

            for (let i = 0; i < Math.min(entity.addLevels(0) * 7, 100); i++) dimension.spawnEntity('minecraft:xp_orb', { x, y: y + 0.25, z })
            entity.addLevels(-entity.addLevels(0) - 1)

            let isEmpty = true

            for (let i = 0; i < 36; i++) {
                const item = inventory.getItem(i)
                if (item && item.typeId === "effect99:key") continue
                inventory.moveItem(i, i, graveInventory)
                if (item) isEmpty = false
            }
            const equipment = entity.getComponent('equippable')
            let i = 37
            for (const slot of equipmentSlots) {
                const item = equipment.getEquipmentSlot(slot).getItem()?.clone()
                graveInventory.setItem(i, item)
                equipment.setEquipment(slot)
                if (item) isEmpty = false
                i++
            }
            if (isEmpty) graveEntity.remove()
            const permutation = block.permutation
            block.setPermutation(permutation.withState("minecraft:cardinal_direction", [ "north", "south", "west", "east" ][Math.floor(Math.random() * 4)]).withState("block:destructible", isEmpty ? 0 : 1))

            if (!isEmpty) {
                const key = new ItemStack('effect99:key')
                key.setLore([`§r§9Place of death: §c${x - 0.5}, ${y}, ${z - 0.5}`, `§r§8${dimension.id}`])
                inventory.addItem(key)
            }
        }
    }
    catch (e) { }
})

world.beforeEvents.worldInitialize.subscribe(i => {
    i.blockComponentRegistry.registerCustomComponent(`block:interact`, {
        onPlayerInteract: function interact() {}
    })
})

world.afterEvents.worldInitialize.subscribe(() => {
    world.getDimension('overworld').runCommand('gamerule keepinventory true')
    world.gameRules.keepInventory = true
})