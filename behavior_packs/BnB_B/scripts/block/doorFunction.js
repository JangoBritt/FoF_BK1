import { world, system, BlockPermutation, ItemStack, EquipmentSlot } from '@minecraft/server';

const processedBlocks = new Map();
const blockStates = new Map();

const DOOR_TYPES = [
    { name: "fir", loot: "fir_door" },
    { name: "jacaranda", loot: "jacaranda_door" },
    { name: "redwood", loot: "redwood_door" },
    { name: "baobab", loot: "baobab_door" },
    { name: "maple", loot: "maple_door" },
    { name: "forsaken_oak", loot: "forsaken_oak_door" },
    { name: "chorus", loot: "chorus_door" }
];

const getHeight = (dimension) => dimension.heightRange.max;

// Register all door logic for each type
DOOR_TYPES.forEach(({ name, loot }) => {
    const doorId = `wypnt_bab:${name}_door`;
    const onPlace = `wypnt_bab:${name}_on_place`;
    const onInteract = `wypnt_bab:${name}_on_interact`;
    const onTick = `wypnt_bab:${name}_on_tick`;

    // Register on_place
    system.beforeEvents.startup.subscribe(eventData => {
        eventData.blockComponentRegistry.registerCustomComponent(onPlace, {
            onPlace(e) {
                const { block } = e;
                const aboveBlock = block.above();
                const northBlock = block.north();
                const southBlock = block.south();
                const eastBlock = block.east();
                const westBlock = block.west();
                const { x, y, z } = block.location;
                
                const currentStates = block.permutation.getAllStates();
                const cardinalDirection = currentStates['minecraft:cardinal_direction'];

                if (aboveBlock.typeId === 'minecraft:air' && !block.permutation.getState('wypnt_bab:upper_block_bit')) {
                    const aboveBlockPermutation = BlockPermutation.resolve(doorId, {
                        'wypnt_bab:upper_block_bit': true,
                        'minecraft:cardinal_direction': cardinalDirection
                    });
                    aboveBlock.setPermutation(aboveBlockPermutation);
                    block.setPermutation(BlockPermutation.resolve(block.typeId, currentStates));
                }

                // Double door hinge logic (simplified, works for all directions)
                const directions = [
                    { dir: 'south', neighbor: eastBlock, aboveNeighbor: aboveBlock.east() },
                    { dir: 'east', neighbor: northBlock, aboveNeighbor: aboveBlock.north() },
                    { dir: 'north', neighbor: westBlock, aboveNeighbor: aboveBlock.west() },
                    { dir: 'west', neighbor: southBlock, aboveNeighbor: aboveBlock.south() }
                ];
                for (const { dir, neighbor, aboveNeighbor } of directions) {
                    if (cardinalDirection === dir && neighbor?.typeId === doorId) {
                        const neighborStates = neighbor.permutation.getAllStates();
                        if (!neighborStates['wypnt_bab:door_hinge_bit']) {
                            block.setPermutation(BlockPermutation.resolve(block.typeId, {
                                ...currentStates,
                                'wypnt_bab:door_hinge_bit': true
                            }));
                        }
                        const aboveBlockCardinalDirection = aboveBlock.permutation.getState('minecraft:cardinal_direction');
                        if (aboveBlockCardinalDirection === dir && aboveNeighbor?.typeId === doorId) {
                            const aboveNeighborStates = aboveNeighbor.permutation.getAllStates();
                            if (!aboveNeighborStates['wypnt_bab:door_hinge_bit']) {
                                aboveBlock.setPermutation(BlockPermutation.resolve(aboveBlock.typeId, {
                                    ...aboveNeighborStates,
                                    'wypnt_bab:door_hinge_bit': true
                                }));
                            }
                        }
                    }
                }
                processedBlocks.set(`${x},${y},${z}`, true);
            },
            beforeOnPlayerPlace: e => {
        	const y = e.block.location.y;
          if (y + 1 >= getHeight(e.dimension)) {
            e.cancel = true;
            return;
           }
        	const upperBlock = e.block.above();

            if (upperBlock?.typeId !== "minecraft:air") {
                e.cancel = true; // Impede o posicionamento
            }
        }
        })
    })

    // Register on_interact
    system.beforeEvents.startup.subscribe(eventData => {
        eventData.blockComponentRegistry.registerCustomComponent(onInteract, {
            onPlayerInteract(e) {
                const { block, player } = e;
                const isUpperBlock = block.permutation.getState('wypnt_bab:upper_block_bit');
                const equipment = player.getComponent('equippable');
                const selectedItem = equipment.getEquipment(EquipmentSlot.Mainhand);
                const targetBlock = isUpperBlock ? block.below() : block.above();
                const currentOpenState = block.permutation.getState('wypnt_bab:open_bit');
                const newOpenState = !currentOpenState;

                block.setPermutation(block.permutation.withState('wypnt_bab:open_bit', newOpenState));
                targetBlock.setPermutation(targetBlock.permutation.withState('wypnt_bab:open_bit', newOpenState));
                player.playSound(currentOpenState ? 'close.wooden_door' : 'open.wooden_door');
            }
        });
    });

    // Register on_tick (redstone logic)
    system.beforeEvents.startup.subscribe(eventData => {
        eventData.blockComponentRegistry.registerCustomComponent(onTick, {
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

                const hasRedstonePower = block.getRedstonePower && block.getRedstonePower() > 0;
                const previousState = blockStates.get(blockKey) || false;
                const shouldOpen = hasRedstonePower && !previousState;
                const shouldClose = !hasRedstonePower && previousState;

                if (shouldOpen || shouldClose) {
                    const newState = shouldOpen;
                    block.setPermutation(block.permutation.withState('wypnt_bab:open_bit', newState));
                    block.dimension.playSound(sound, block.location);
                    blockStates.set(blockKey, newState);

                    // Update the other half of the door
                    const isUpperBlock = block.permutation.getState('wypnt_bab:upper_block_bit');
                    const correspondingBlock = isUpperBlock ? adjacentBlocks.below : adjacentBlocks.above;
                    if (correspondingBlock?.typeId === doorId) {
                        correspondingBlock.setPermutation(correspondingBlock.permutation.withState('wypnt_bab:open_bit', newState));
                    }
                }
            }
        });
    });

    // Loot and block break logic
    system.run(() => {
        world.afterEvents.playerBreakBlock.subscribe(eventData => {
            const { block, player } = eventData;
            const { x, y, z } = block.location;
            const belowBlock = block.below();
            if (belowBlock.typeId === doorId) {
            	if (player.getGameMode() !== "Creative") {
                dimension.runCommand(`setblock ${x} ${y - 1} ${z} air destroy`);
                } else { belowBlock.setType('minecraft:air'); }
            }
            processedBlocks.delete(`${x},${y},${z}`);
            processedBlocks.delete(`${x},${y-1},${z}`);
        });
    });

    // Prevent placing on top of another door
    /* if (world.beforeEvents && world.beforeEvents.playerPlaceBlock) {
        world.beforeEvents.playerPlaceBlock.subscribe(event => {
            const { block } = event;
            const belowBlock = block.below();
            if (belowBlock.typeId === doorId) {
                event.cancel = true;
            }
        });
    } */
});