import { world, system } from "@minecraft/server"

let worldPlayer = [];
const validAxes = [ 'treesaw', ]

const worldTicks = () => system.run(() => {
    const t = system.currentTick
    if (t % 5 === 0) {
        for (const players of world.getPlayers()) {
            if (worldPlayer.find(o => { return o.playerName === players.name })) { }
            else {
                worldPlayer.push({ playerName: players.name, idBlock: '', logBlocks: [], otherBlocks: [], logCount: 1, otherCount: 0 })
            }
        }
    }
    if (t % 2 === 0) {
        for (let i = 0; i < worldPlayer.length; i++) {
            if (worldPlayer[i].logCount >= 128) {
                worldPlayer[i] = { playerName: worldPlayer[i].playerName, idBlock: '', logBlocks: [], otherBlocks: [], logCount: 1, otherCount: 0 }
                for (const players of world.getPlayers()) {
                    if (worldPlayer.find(o => { return o.playerName === players.name })) {
                        players.dimension.runCommand(`title "${worldPlayer[i].playerName}" actionbar §fMax 128 blocks`)
                    }
                }
            }
            else if (worldPlayer[i].logBlocks[0] || worldPlayer[i].otherBlocks[0]) {
                if (worldPlayer[i].logBlocks[0]) {
                    function callsSpeed(Num) {
                        for (let ti = 0; ti < Num; ti++) {
                            treeDestroy(i, worldPlayer[i].idBlock, worldPlayer[i].logBlocks)
                        }
                    }
                    callsSpeed(5);
                }
                if (worldPlayer[i].otherBlocks[0]) {
                    function callsSpeed(Num) {
                        for (let ti = 0; ti < Num; ti++) {
                            treeDestroy(i, worldPlayer[i].idBlock, worldPlayer[i].otherBlocks)
                        }
                    }
                    callsSpeed(78);
                }
            }
            else {
                worldPlayer[i] = { playerName: worldPlayer[i].playerName, idBlock: '', logBlocks: [], otherBlocks: [], logCount: 1, otherCount: 0 }
            }
        }
    }
    worldTicks()
})
worldTicks()

world.afterEvents.playerBreakBlock.subscribe(f => {
    const player = f.player
    try {
        let inv = player.getComponent("inventory").container.getItem(player.selectedSlotIndex)
        let durability = inv.getComponent('durability')
        if (!player.isSneaking && validAxes.some(x => { return inv.typeId.includes(x) }) && durability.damage < durability.maxDurability - 5) {
            const blockId = f.brokenBlockPermutation.type.id
            const { x, y, z } = f.block.location
            if (((blockId.includes('log') || blockId.includes('_roots') || blockId.includes('_wood') || blockId.includes('_mushroom_') || blockId.includes('_stem') || blockId.includes('_wart_')) && !blockId.includes('stripped')) && f.dimension.getBlock({ x, y: y + 1, z }).typeId == blockId) {
                for (let i = 0; i < worldPlayer.length; i++) {
                    if (worldPlayer[i].playerName === player.name) {
                        worldPlayer[i].logBlocks.push(`${x} ${y + 1} ${z}`)
                        worldPlayer[i].idBlock = blockId
                    }
                }
            }
        } else if (validAxes.some(x => { return inv.typeId.includes(x) })) {
            player.onScreenDisplay.setActionBar(`§cSaw durability: ${durability.maxDurability - durability.damage}/${durability.maxDurability}`)
        }
    } catch (e) { }

})
function treecapitator(block, x, y, z, player, dimension) {
    try {
        const blockSides = [
            [x, y - 1, z], // Below
            [x, y + 1, z], // Above

            [x + 1, y, z], // West
            [x - 1, y, z], // East

            [x, y, z + 1], // North
            [x, y, z - 1], // South

            [x + 1, y + 1, z], // West Above
            [x - 1, y + 1, z], // East Above

            [x, y + 1, z + 1], // North Above
            [x, y + 1, z - 1], // South Above

            [x + 1, y - 1, z], // West Below
            [x - 1, y - 1, z], // East Below

            [x, y - 1, z + 1], // North Below
            [x, y - 1, z - 1], // South Below


            [x + 1, y, z + 1], //NW
            [x + 1, y, z - 1], //SW
            
            [x - 1, y, z + 1], //SW
            [x - 1, y, z - 1], //SE

            [x + 1, y - 1, z + 1], //NW Below
            [x + 1, y - 1, z - 1], //SW Below
            
            [x - 1, y - 1, z + 1], //SW Below
            [x - 1, y - 1, z - 1], //SE Below

            [x + 1, y + 1, z + 1], //NW Above
            [x + 1, y + 1, z - 1], //SW Above
            
            [x - 1, y + 1, z - 1], //NE Above
            [x - 1, y + 1, z + 1]  //SE Above
        ]
        for (const coords of blockSides) {
            const idBlocks = dimension.getBlock({ x: coords[0], y: coords[1], z: coords[2] }).typeId
            if (idBlocks == block && worldPlayer[player].logCount < 128) {
                if (worldPlayer[player].logBlocks.every(l => l != `${coords[0]} ${coords[1]} ${coords[2]}`)) {
                    worldPlayer[player].logBlocks.push(`${coords[0]} ${coords[1]} ${coords[2]}`)
                    worldPlayer[player].logCount += 1
                }
            }
            if ((idBlocks.includes('leaves') || idBlocks.includes('_roots') || idBlocks.includes('_wood') || idBlocks.includes('vine') || idBlocks.includes('_wart_') || idBlocks.includes('shroomlight')) && (worldPlayer[player].otherCount < worldPlayer[player].logCount * 6 && worldPlayer[player].otherCount < 390)) {
                if (worldPlayer[player].otherBlocks.every(o => o != `${coords[0]} ${coords[1]} ${coords[2]}`)) {
                    worldPlayer[player].otherBlocks.push(`${coords[0]} ${coords[1]} ${coords[2]}`)
                    worldPlayer[player].otherCount += 1
                }
            }
        }
    } catch (e) { }
}
function treeDestroy(player, block, blockList) {
    for (const players of world.getAllPlayers()) {
        if (players.name === `${worldPlayer[player].playerName}`) {
            try {
                const container = players.getComponent("inventory").container
                const itemStack = container.getItem(players.selectedSlotIndex)
                const durability = itemStack.getComponent('durability') ?? { damage: 0, maxDurability: 0 }
                
                if (validAxes.some(x => { return itemStack.typeId.includes(x) }) && durability.damage < durability.maxDurability - 5) {
                    if (worldPlayer[player].logBlocks[0] || worldPlayer[player].otherBlocks[0]) {
                        const enchanment = itemStack.getComponent("enchantable")
                        const x = Number(blockList[0].slice(0, blockList[0].indexOf(' ')))
                        const y = Number(blockList[0].slice(blockList[0].indexOf(' '), blockList[0].indexOf(' ', blockList[0].indexOf(' ') + 1)))
                        const z = Number(blockList[0].slice(blockList[0].indexOf(' ', blockList[0].indexOf(' ') + 1)))
                        //players.onScreenDisplay.setActionBar(`§f${block} §6log: ${worldPlayer[player].logCount} §8/ §fOther: ${worldPlayer[player].otherCount} - §6${x} ${y} ${z} - §fIndex Player: ${player}`)
                        const logId = players.dimension.getBlock({ x, y, z }).typeId
                        if (logId.includes('log') || logId.includes('_stem') || logId.includes('_wood') || logId.includes('_wart_')) {
                            const { level } = enchanment.getEnchantment("unbreaking") ?? { level: 0 }
                            if (level === 1) {
                                if (Math.floor(Math.random() * 2) === 0) updatedItem()
                            }
                            else if (level === 2) {
                                if (Math.floor(Math.random() * 4) === 0) updatedItem()
                            }
                            else if (level === 3) {
                                if (Math.floor(Math.random() * 6) === 0) updatedItem()
                            }
                            else {
                                updatedItem()
                            }
                            function updatedItem() {
                                itemStack.getComponent("durability").damage += 1
                                container.setItem(players.selectedSlotIndex, itemStack)
                                players.onScreenDisplay.setActionBar(`Saw durability: ${durability.maxDurability - durability.damage}/${durability.maxDurability}`)
                            }
                        }
                        players.dimension.runCommand(`setblock ${blockList.splice(0, 1)} air destroy`)
                        treecapitator(block, x, y, z, player, players.dimension)
                    }
                }
                else {
                    if (validAxes.some(x => { return itemStack.typeId.includes(x) }) && durability.damage >= durability.maxDurability - 5) {
                        players.onScreenDisplay.setActionBar(`§cSaw durability: ${durability.maxDurability - durability.damage}/${durability.maxDurability}`)
                    }
                    worldPlayer[player] = { playerName: players.name, idBlock: '', logBlocks: [], otherBlocks: [], logCount: 1, otherCount: 0 }
                }
            }
            catch (e) { }
        }
    }
}