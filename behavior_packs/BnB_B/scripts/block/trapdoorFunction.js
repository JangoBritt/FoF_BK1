import { world, system, BlockPermutation, ItemStack, BlockTypes } from '@minecraft/server';

const TRAPDOOR_TYPES = [
    "fir",
    "jacaranda",
    "redwood",
    "baobab",
    "maple",
    "forsaken_oak",
    "chorus"
];

const blockStates = new Map();

system.beforeEvents.startup.subscribe(eventData => {
    TRAPDOOR_TYPES.forEach(type => {
        const trapdoorId = `wypnt_bab:${type}_trapdoor`;
        const doorId = `wypnt_bab:${type}_door`;
        const interactComponent = `${trapdoorId}_on_interact`;
        const tickComponent = `${trapdoorId}_on_tick`;

        eventData.blockComponentRegistry.registerCustomComponent(interactComponent, {
            onPlayerInteract(e) {
                const { block, player } = e;
                const equipment = player.getComponent('equippable');
                const selectedItem = equipment.getEquipment('Mainhand');
                const currentState = block.permutation.getState('wypnt_bab:open');
                const newOpenState = !currentState;
                const newPermutation = BlockPermutation.resolve(block.typeId, {
                    ...block.permutation.getAllStates(),
                    'wypnt_bab:open': newOpenState
                });
                block.setPermutation(newPermutation);
                const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';
                player.playSound(sound);

            }
        });

        eventData.blockComponentRegistry.registerCustomComponent(tickComponent, {
            onTick(e) {
                const { block } = e;
                const { x, y, z } = block.location;
                const blockKey = `${x},${y},${z}`;
                const currentState = block.permutation.getState('wypnt_bab:open_bit');
                const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';

                const adjacentBlocks = {
                    north: block.north(),
                    east: block.east(),
                    south: block.south(),
                    west: block.west(),
                    above: block.above(),
                    below: block.below()
                };

                const excludedBlocks = [
                    'minecraft:wooden_door', 'minecraft:iron_door', 'minecraft:acacia_door', 'minecraft:birch_door',
                    'minecraft:crimson_door', 'minecraft:dark_oak_door', 'minecraft:jungle_door', 'minecraft:oak_door',
                    'minecraft:spruce_door', 'minecraft:warped_door', 'minecraft:mangrove_door', 'minecraft:cherry_door',
                    'minecraft:bamboo_door', 'minecraft:iron_trapdoor', 'minecraft:acacia_trapdoor', 'minecraft:birch_trapdoor',
                    'minecraft:crimson_trapdoor', 'minecraft:dark_oak_trapdoor', 'minecraft:jungle_trapdoor', 'minecraft:oak_trapdoor',
                    'minecraft:spruce_trapdoor', 'minecraft:warped_trapdoor', 'minecraft:mangrove_trapdoor', 'minecraft:cherry_trapdoor',
                    'minecraft:bamboo_trapdoor', 'minecraft:trapdoor', 'minecraft:observer', 'minecraft:unpowered_repeater',
                    'minecraft:powered_repeater', 'minecraft:unpowered_comparator', 'minecraft:powered_comparator'
                ];
                const hasRedstonePower = Object.values(adjacentBlocks).some(adjacentBlock =>
                    !excludedBlocks.includes(adjacentBlock?.typeId) && adjacentBlock?.getRedstonePower() > 0
                );
                const isRedstoneTorchTop = adjacentBlocks.above?.typeId === 'minecraft:redstone_torch' &&
                    adjacentBlocks.above.permutation.getState('torch_facing_direction') === 'top';

                const destroyableBlocksArray = [
                    'minecraft:wooden_button', 'minecraft:stone_button', 'minecraft:oak_button', 'minecraft:spruce_button',
                    'minecraft:birch_button', 'minecraft:jungle_button', 'minecraft:acacia_button', 'minecraft:dark_oak_button',
                    'minecraft:crimson_button', 'minecraft:warped_button', 'minecraft:polished_blackstone_button', 'minecraft:mangrove_button',
                    'minecraft:cherry_button', 'minecraft:bamboo_button', 'minecraft:wooden_pressure_plate', 'minecraft:stone_pressure_plate',
                    'minecraft:light_weighted_pressure_plate', 'minecraft:heavy_weighted_pressure_plate', 'minecraft:acacia_pressure_plate',
                    'minecraft:birch_pressure_plate', 'minecraft:crimson_pressure_plate', 'minecraft:dark_oak_pressure_plate',
                    'minecraft:jungle_pressure_plate', 'minecraft:spruce_pressure_plate', 'minecraft:warped_pressure_plate',
                    'minecraft:mangrove_pressure_plate', 'minecraft:cherry_pressure_plate', 'minecraft:bamboo_pressure_plate',
                    'minecraft:polished_blackstone_pressure_plate'
                ];
                const destroyableBlocks = destroyableBlocksArray.includes(adjacentBlocks.above?.typeId) &&
                    adjacentBlocks.above?.getRedstonePower() > 0;

                const observerFacingBlock = [
                    { block: adjacentBlocks.north, direction: 'north' },
                    { block: adjacentBlocks.east, direction: 'east' },
                    { block: adjacentBlocks.south, direction: 'south' },
                    { block: adjacentBlocks.west, direction: 'west' },
                    { block: adjacentBlocks.above, direction: 'up' },
                    { block: adjacentBlocks.below, direction: 'down' }
                ].some(({ block, direction }) => block?.typeId === 'minecraft:observer' &&
                    block?.permutation.getState('minecraft:facing_direction') === direction && block?.getRedstonePower() > 1);

                const poweredRepeater = [
                    { block: adjacentBlocks.north, direction: 'north' },
                    { block: adjacentBlocks.east, direction: 'east' },
                    { block: adjacentBlocks.south, direction: 'south' },
                    { block: adjacentBlocks.west, direction: 'west' }
                ].some(({ block, direction }) => block?.typeId === 'minecraft:powered_repeater' &&
                    block?.permutation.getState('minecraft:cardinal_direction') === direction);

                const poweredComparator = [
                    { block: adjacentBlocks.north, direction: 'north' },
                    { block: adjacentBlocks.east, direction: 'east' },
                    { block: adjacentBlocks.south, direction: 'south' },
                    { block: adjacentBlocks.west, direction: 'west' }
                ].some(({ block, direction }) => block?.typeId === 'minecraft:powered_comparator' &&
                    block?.permutation.getState('minecraft:cardinal_direction') === direction);

                const previousState = blockStates.get(blockKey) || false;
                const shouldOpen = (hasRedstonePower || observerFacingBlock || poweredRepeater || poweredComparator) && !previousState && !isRedstoneTorchTop;
                const shouldClose = (!hasRedstonePower && !observerFacingBlock && !poweredRepeater && !poweredComparator) && previousState && !isRedstoneTorchTop;

                if (shouldOpen || shouldClose) {
                    const newState = shouldOpen;
                    block.setPermutation(block.permutation.withState('wypnt_bab:open_bit', newState));
                    block.dimension.playSound(sound, block.location);
                    blockStates.set(blockKey, newState);

                    // Update the corresponding door half if present
                    const isUpperBlock = block.permutation.getState('wypnt_bab:upper_block_bit');
                    const correspondingBlock = isUpperBlock ? adjacentBlocks.below : adjacentBlocks.above;
                    if (correspondingBlock?.typeId === doorId) {
                        correspondingBlock.setPermutation(correspondingBlock.permutation.withState('wypnt_bab:open_bit', newState));
                    }
                }

                if (destroyableBlocks) {
                    block.dimension.runCommand(`/setblock ${x} ${y + 1} ${z} air destroy`);
                }
            }
        });
    });
});
