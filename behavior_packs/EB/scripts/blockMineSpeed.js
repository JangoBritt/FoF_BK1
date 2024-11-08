import { world } from '@minecraft/server'

const pickaxes = {
    "wooden_pickaxe": "wood",
    "stone_pickaxe": "stone",
    "iron_pickaxe": "iron",
    "golden_pickaxe": "gold",
    "diamond_pickaxe": "diamond",
    "netherite_pickaxe": "netherite"
}

const axes = {
    "wooden_axe": "wood",
    "stone_axe": "stone",
    "iron_axe": "iron",
    "golden_axe": "gold",
    "diamond_axe": "diamond",
    "netherite_axe": "netherite"
}

const shovels = {
    "wooden_shovel": "wood",
    "stone_shovel": "stone",
    "iron_shovel": "iron",
    "golden_shovel": "gold",
    "diamond_shovel": "diamond",
    "netherite_shovel": "netherite"
}

const hoes = {
    "wooden_hoe": "wood",
    "stone_hoe": "stone",
    "iron_hoe": "iron",
    "golden_hoe": "gold",
    "diamond_hoe": "diamond",
    "netherite_hoe": "netherite"
}

world.afterEvents.entityHitBlock.subscribe(eventData => {
    const block = eventData.hitBlock
    const player = eventData.damagingEntity

    if (!block.hasTag('k_custom_mining_speed')) return

    const tool = player.getComponent('equippable').getEquipment('Mainhand')

    const correctTool = block.getTags().find(tag => tag.startsWith('k_correct_tool:')).split(':')[1]

    let tier

    switch (correctTool) {
        case 'pickaxe':
            tier = pickaxes[tool?.typeId.split(':')[1]]
            break
        case 'axe':
            tier = axes[tool?.typeId.split(':')[1]]
            break
        case 'shovel':
            tier = shovels[tool?.typeId.split(':')[1]]
            break
        case 'hoe':
            tier = hoes[tool?.typeId.split(':')[1]]
            break
    }

    block.setPermutation(block.permutation.withState('korbon:tool', tier ?? 'default'))
})