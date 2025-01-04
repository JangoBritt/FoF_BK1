import { BlockPermutation, system, world } from '@minecraft/server';

const interactCooldowns = new Map()

const useableBlocks = [
    'warped_roots',
    'crimson_roots',
    'bluebell',
    'brittlebright',
    'aloe_vera',
    'brittlebush',
    'buttercup',
    'cattail_bottom',
    'daisy_petals',
    'didymoch',
    'dune_grass',
    'jungfern_bottom',
    'violet_flower',
    'sandy_shrub',
    'wild_beetroots',
    'wild_cabbages',
    'wild_carrots',
    'wild_onions',
    'wild_potatoes',
    'wild_tomatoes',
]

world.beforeEvents.itemUseOn.subscribe(event => {

    const { block, itemStack, source, blockFace } = event

    const typeId = block.getItemStack()?.typeId.split(':').pop()
    if (!typeId) return;

    if (!typeId || itemStack.typeId != 'minecraft:bone_meal' || !useableBlocks.includes(typeId) || interactCooldowns.get(source.id)) return;

    interactCooldowns.set(source.id, true)
    event.cancel = true
    system.run(() => {

        interactCooldowns.set(source.id, false)


        let neighbors3x3 = [];
        for (let x = -3; x <= 3; x++) {
            for (let z = -3; z <= 3; z++) {
                const blocky = block.dimension.getBlock({ x: block.location.x + x, y: block.location.y, z: block.location.z + z });
                if (blocky.isAir) neighbors3x3.push(blocky);
            }
        }
        source.dimension.spawnParticle('minecraft:crop_growth_area_emitter', block.center());
        for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
            neighbors3x3[Math.floor(Math.random() * neighbors3x3.length)]?.setPermutation(block.permutation);
        }


        source.playSound('use.grass', { location: block.center() })
        source.dimension.spawnParticle('minecraft:crop_growth_emitter', block.center())

        if (world.getPlayers({ gameMode: 'creative' }).map(x => x.id).includes(source.id)) return;

        try {
            itemStack.amount -= 1
            source.getComponent('equippable').setEquipment('Mainhand', itemStack)
        } catch (error) {
            source.getComponent('equippable').setEquipment('Mainhand')
        }
    })

})