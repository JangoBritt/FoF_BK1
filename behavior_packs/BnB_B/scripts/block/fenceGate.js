import { world, system, BlockPermutation, ItemStack, BlockTypes } from '@minecraft/server';

const blockStates = new Map();

const FENCE_GATE_TYPES = [
    "fir",
    "jacaranda",
    "redwood",
    "baobab",
    "maple",
    "forsaken_oak",
    "chorus"
];

// Utility functions
function getNewCardinalDirection(currentDirection, angle) {
    const direction = directionDisplay(angle);
    if (['north', 'south'].includes(currentDirection)) {
        return direction.includes('south') ? 'south' : 'north';
    } else {
        return direction.includes('west') ? 'west' : 'east';
    }
}
function directionDisplay(angle) {
    if (Math.abs(angle) > 112.5) return 'south';
    if (Math.abs(angle) < 67.5) return 'north';
    if (angle < 157.5 && angle > 22.5) return 'west';
    if (angle > -157.5 && angle < -22.5) return 'east';
    return '';
}

system.beforeEvents.startup.subscribe(eventData => {
    FENCE_GATE_TYPES.forEach(type => {
        const gateId = `wypnt_bab:${type}_fence_gate`;

        // Interact
        eventData.blockComponentRegistry.registerCustomComponent(`${gateId}_on_interact`, {
            onPlayerInteract(e) {
                const { block, player, face } = e;
                const equipment = player.getComponent('equippable');
                const selectedItem = equipment.getEquipment('Mainhand');
                // Place block on top if possible
                
                // Toggle open state and play sound
                const currentState = block.permutation.getState('wypnt_bab:open');
                const newOpenState = !currentState;
                const sound = newOpenState ? 'open.fence_gate' : 'close.fence_gate';
                const rotationAngle = player.getRotation().y;
                const newCardinalDirection = getNewCardinalDirection(block.permutation.getState('minecraft:cardinal_direction'), rotationAngle);
                const newPermutation = BlockPermutation.resolve(block.typeId, {
                    ...block.permutation.getAllStates(),
                    'wypnt_bab:open': newOpenState,
                    'minecraft:cardinal_direction': newCardinalDirection
                });
                block.setPermutation(newPermutation);
                block.dimension.playSound(sound, block.location);
                // Update invisible above block if present
                
            }
        });

        // Tick (redstone, wall, etc)
        eventData.blockComponentRegistry.registerCustomComponent(`${gateId}_on_tick`, {
            onTick(e) {
                const { block } = e;
                const { x, y, z } = block.location;
                const blockKey = `${x},${y},${z}`;
                const currentState = block.permutation.getState('wypnt_bab:open');
                const cardinalDirection = block.permutation.getState('minecraft:cardinal_direction');
                const sound = currentState ? 'open.fence_gate' : 'close.fence_gate';

                const adjacentBlocks = {
                    north: block.north(),
                    east: block.east(),
                    south: block.south(),
                    west: block.west(),
                    above: block.above(),
                    below: block.below()
                };

                // Wall connection
                const allowedBlocks = ['minecraft:cobblestone_wall', 'minecraft:stone_wall'];
                const hasAllowedBlock = (blocks) => blocks.some(adjacentBlock => allowedBlocks.includes(adjacentBlock?.typeId));
                const hasAllowedAdjacentBlock = (cardinalDirection === 'north' || cardinalDirection === 'south')
                    ? hasAllowedBlock([adjacentBlocks.east, adjacentBlocks.west])
                    : hasAllowedBlock([adjacentBlocks.north, adjacentBlocks.south]);
                block.setPermutation(block.permutation.withState('wypnt_bab:in_wall_bit', hasAllowedAdjacentBlock));

                // Redstone logic
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

                // Destroyable blocks
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

                // Observer, repeater, comparator logic (same as your code)
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
                    block.setPermutation(block.permutation.withState('wypnt_bab:open', newState));
                    block.dimension.playSound(sound, block.location);
                    blockStates.set(blockKey, newState);
                    // Update invisible above block if present
                }
                if (destroyableBlocks) {
                    block.dimension.runCommand(`/setblock ${x} ${y + 1} ${z} air destroy`);
                }
            }
        });

        // Place
        eventData.blockComponentRegistry.registerCustomComponent(`${gateId}_on_player_placed`, {
            onPlace(e) {
                const { block } = e;
                const aboveBlock = block.above();
                const currentStates = block.permutation.getAllStates();
                const cardinalDirection = currentStates['minecraft:cardinal_direction'];
                if (cardinalDirection === 'south') {
                    currentStates['wypnt_bab:direction'] = true;
                    block.setPermutation(BlockPermutation.resolve(block.typeId, currentStates));
                }
            }
        });

        // Destroy
        eventData.blockComponentRegistry.registerCustomComponent(`${gateId}_on_player_destroy`, {
            onPlayerDestroy(e) {
                const { block } = e;
                const aboveBlock = block.above();
                if (aboveBlock.typeId === gateId && aboveBlock.permutation.getState('wypnt_bab:invisible')) {
                    aboveBlock.setType('minecraft:air');
                }
            }
        });
    });
});