// Import necessary modules from Minecraft server API
import { world, BlockPermutation, ItemStack, BlockTypes } from '@minecraft/server';

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:on_interact for door interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:on_interact', {
        // Define the behavior when a player interacts with the door block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;
            const isUpperBlock = block.permutation.getState('korbon:upper_block_bit');

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');
            
            // Determine the target block to update
            const targetBlock = isUpperBlock ? block.below() : block.above();

            // Get the current state of the 'korbon:open_bit' block trait for both the interacted block and the target block
            const currentOpenState = block.permutation.getState('korbon:open_bit');
            const targetOpenState = targetBlock.permutation.getState('korbon:open_bit');

            // Determine the new state of the 'korbon:open_bit' block trait (toggle between true and false)
            const newOpenState = !currentOpenState;
            const newTargetOpenState = !targetOpenState;

            // Resolve the new block permutation based on the current block type and updated states
            const newBlockPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open_bit': newOpenState
            });

            const newTargetBlockPermutation = BlockPermutation.resolve(targetBlock.typeId, {
                ...targetBlock.permutation.getAllStates(),
                'korbon:open_bit': newTargetOpenState
            });

            // Set the block permutations to the newly resolved permutations
            block.setPermutation(newBlockPermutation);
            targetBlock.setPermutation(newTargetBlockPermutation);

            // Determine the sound effect to play based on the current state of the door
            const sound = currentOpenState ? 'close.wooden_door' : 'open.wooden_door';

            // Play the corresponding sound effect for opening or closing the door
            player.playSound(sound);

            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }

            // Check if the block interacted is a korbon:baobab_door and the player is using a water bucket
            if (block.typeId === 'korbon:baobab_door' && selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                // Get the structure file with our door block waterlogged
                const structureName = 'mystructure:baobab_door';

                // Place the structure
                const { x, y, z } = block.location;
                world.structureManager.place(structureName, e.dimension, { x, y, z });

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:on_interact for door interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_on_interact', {
        // Define the behavior when a player interacts with the door block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;
            const isUpperBlock = block.permutation.getState('korbon:upper_block_bit');

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');
            
            // Determine the target block to update
            const targetBlock = isUpperBlock ? block.below() : block.above();

            // Get the current state of the 'korbon:open_bit' block trait for both the interacted block and the target block
            const currentOpenState = block.permutation.getState('korbon:open_bit');
            const targetOpenState = targetBlock.permutation.getState('korbon:open_bit');

            // Determine the new state of the 'korbon:open_bit' block trait (toggle between true and false)
            const newOpenState = !currentOpenState;
            const newTargetOpenState = !targetOpenState;

            // Resolve the new block permutation based on the current block type and updated states
            const newBlockPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open_bit': newOpenState
            });

            const newTargetBlockPermutation = BlockPermutation.resolve(targetBlock.typeId, {
                ...targetBlock.permutation.getAllStates(),
                'korbon:open_bit': newTargetOpenState
            });

            // Set the block permutations to the newly resolved permutations
            block.setPermutation(newBlockPermutation);
            targetBlock.setPermutation(newTargetBlockPermutation);

            // Determine the sound effect to play based on the current state of the door
            const sound = currentOpenState ? 'close.wooden_door' : 'open.wooden_door';

            // Play the corresponding sound effect for opening or closing the door
            player.playSound(sound);

            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }

            // Check if the block interacted is a korbon:jacaranda_door and the player is using a water bucket
            if (block.typeId === 'korbon:jacaranda_door' && selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                // Get the structure file with our door block waterlogged
                const structureName = 'mystructure:jacaranda_door';

                // Place the structure
                const { x, y, z } = block.location;
                world.structureManager.place(structureName, e.dimension, { x, y, z });

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:on_interact for door interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_on_interact', {
        // Define the behavior when a player interacts with the door block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;
            const isUpperBlock = block.permutation.getState('korbon:upper_block_bit');

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');
            
            // Determine the target block to update
            const targetBlock = isUpperBlock ? block.below() : block.above();

            // Get the current state of the 'korbon:open_bit' block trait for both the interacted block and the target block
            const currentOpenState = block.permutation.getState('korbon:open_bit');
            const targetOpenState = targetBlock.permutation.getState('korbon:open_bit');

            // Determine the new state of the 'korbon:open_bit' block trait (toggle between true and false)
            const newOpenState = !currentOpenState;
            const newTargetOpenState = !targetOpenState;

            // Resolve the new block permutation based on the current block type and updated states
            const newBlockPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open_bit': newOpenState
            });

            const newTargetBlockPermutation = BlockPermutation.resolve(targetBlock.typeId, {
                ...targetBlock.permutation.getAllStates(),
                'korbon:open_bit': newTargetOpenState
            });

            // Set the block permutations to the newly resolved permutations
            block.setPermutation(newBlockPermutation);
            targetBlock.setPermutation(newTargetBlockPermutation);

            // Determine the sound effect to play based on the current state of the door
            const sound = currentOpenState ? 'close.wooden_door' : 'open.wooden_door';

            // Play the corresponding sound effect for opening or closing the door
            player.playSound(sound);

            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }

            // Check if the block interacted is a korbon:redwood_door and the player is using a water bucket
            if (block.typeId === 'korbon:redwood_door' && selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                // Get the structure file with our door block waterlogged
                const structureName = 'mystructure:redwood_door';

                // Place the structure
                const { x, y, z } = block.location;
                world.structureManager.place(structureName, e.dimension, { x, y, z });

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:on_interact for placing any block above our fence
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_fence_on_interact', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;
            
            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is a block
            if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
                // Calculate the position above the current block
                const aboveBlock = block.above();

                // If the block above is a korbon:fence_inventory (an equivalent of air)...
                if (aboveBlock.typeId === 'korbon:baobab_fence_inventory') {
                    // ...place the selected block above the current block
                    aboveBlock.setType(selectedItem.typeId);
                    
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                }
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_fence_on_interact for placing any block above our fence
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_fence_on_interact', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;
            
            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is a block
            if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
                // Calculate the position above the current block
                const aboveBlock = block.above();

                // If the block above is a korbon:fence_inventory (an equivalent of air)...
                if (aboveBlock.typeId === 'korbon:jacaranda_fence_inventory') {
                    // ...place the selected block above the current block
                    aboveBlock.setType(selectedItem.typeId);
                    
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                }
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_fence_on_interact for placing any block above our fence
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_fence_on_interact', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;
            
            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is a block
            if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
                // Calculate the position above the current block
                const aboveBlock = block.above();

                // If the block above is a korbon:fence_inventory (an equivalent of air)...
                if (aboveBlock.typeId === 'korbon:redwood_fence_inventory') {
                    // ...place the selected block above the current block
                    aboveBlock.setType(selectedItem.typeId);
                    
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                }
            }
        }
    });
});









// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_fence_gate_on_interact for handling specific interactions
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_fence_gate_on_interact', {
        // Define the behavior when a player interacts with the fence gate
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if a player tried to place a block on top of the fence gate
            if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
                // Calculate the position above the current block
                const aboveBlock = block.above();

                // If the block above is a korbon:fence_gate (an equivalent of air)...
                if (aboveBlock.typeId === 'korbon:baobab_fence_gate') {
                    // ...place the selected block above the current block
                    aboveBlock.setType(selectedItem.typeId);
                    
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                    return; // Exit the function after placing the block
                }
            }

            // Toggle the 'korbon:open' state between false and true and determine the sound effect to play
            const currentState = block.permutation.getState('korbon:open');
            const newOpenState = !currentState;
            const sound = newOpenState ? 'open.fence_gate' : 'close.fence_gate';

            // Determine the new cardinal direction based on the player's rotation
            const rotationAngle = player.getRotation().y;
            const newCardinalDirection = getNewCardinalDirection(block.permutation.getState('minecraft:cardinal_direction'), rotationAngle);

            // Update the block's permutation with the new states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open': newOpenState,
                'minecraft:cardinal_direction': newCardinalDirection
            });

            // Apply the new permutation and play the sound
            block.setPermutation(newPermutation);
            block.dimension.playSound(sound, block.location);

            // Corrected: Remove redeclaration of aboveBlock
            const aboveBlock = block.above();
            // Checks if the block above our fence gate is an invisible fence gate (equivalent to air)
            if (aboveBlock.typeId === 'korbon:baobab_fence_gate' && aboveBlock.permutation.getState('korbon:invisible')) {
                const aboveCurrentState = aboveBlock.permutation.getState('korbon:open');
                // Update korbon:open state of the invisible fence gate above our fence gate
                if (aboveCurrentState !== newOpenState) {
                    const newAbovePermutation = BlockPermutation.resolve(aboveBlock.typeId, {
                        ...aboveBlock.permutation.getAllStates(),
                        'korbon:open': newOpenState
                    });
                    aboveBlock.setPermutation(newAbovePermutation);
                }
            }
        }
    });
});

// Function to calculate the new cardinal direction based on the player's rotation
function getNewCardinalDirection(currentDirection, angle) {
    const direction = directionDisplay(angle);
    if (['north', 'south'].includes(currentDirection)) {
        return direction.includes('south') ? 'south' : 'north';
    } else {
        return direction.includes('west') ? 'west' : 'east';
    }
}

// Function to calculate the direction a player is looking at
function directionDisplay(angle) {
    if (Math.abs(angle) > 112.5) return 'north';
    if (Math.abs(angle) < 67.5) return 'south';
    if (angle < 157.5 && angle > 22.5) return 'west';
    if (angle > -157.5 && angle < -22.5) return 'east';
    return '';
}

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_fence_gate_on_interact for handling specific interactions
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_fence_gate_on_interact', {
        // Define the behavior when a player interacts with the fence gate
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if a player tried to place a block on top of the fence gate
            if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
                // Calculate the position above the current block
                const aboveBlock = block.above();

                // If the block above is a korbon:fence_gate (an equivalent of air)...
                if (aboveBlock.typeId === 'korbon:jacaranda_fence_gate') {
                    // ...place the selected block above the current block
                    aboveBlock.setType(selectedItem.typeId);
                    
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                    return; // Exit the function after placing the block
                }
            }

            // Toggle the 'korbon:open' state between false and true and determine the sound effect to play
            const currentState = block.permutation.getState('korbon:open');
            const newOpenState = !currentState;
            const sound = newOpenState ? 'open.fence_gate' : 'close.fence_gate';

            // Determine the new cardinal direction based on the player's rotation
            const rotationAngle = player.getRotation().y;
            const newCardinalDirection = getNewCardinalDirection(block.permutation.getState('minecraft:cardinal_direction'), rotationAngle);

            // Update the block's permutation with the new states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open': newOpenState,
                'minecraft:cardinal_direction': newCardinalDirection
            });

            // Apply the new permutation and play the sound
            block.setPermutation(newPermutation);
            block.dimension.playSound(sound, block.location);

            // Corrected: Remove redeclaration of aboveBlock
            const aboveBlock = block.above();
            // Checks if the block above our fence gate is an invisible fence gate (equivalent to air)
            if (aboveBlock.typeId === 'korbon:jacaranda_fence_gate' && aboveBlock.permutation.getState('korbon:invisible')) {
                const aboveCurrentState = aboveBlock.permutation.getState('korbon:open');
                // Update korbon:open state of the invisible fence gate above our fence gate
                if (aboveCurrentState !== newOpenState) {
                    const newAbovePermutation = BlockPermutation.resolve(aboveBlock.typeId, {
                        ...aboveBlock.permutation.getAllStates(),
                        'korbon:open': newOpenState
                    });
                    aboveBlock.setPermutation(newAbovePermutation);
                }
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_fence_gate_on_interact for handling specific interactions
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_fence_gate_on_interact', {
        // Define the behavior when a player interacts with the fence gate
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');
            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if a player tried to place a block on top of the fence gate
            if (selectedItem && face === 'Up' && BlockTypes.get(selectedItem.typeId)) {
                // Calculate the position above the current block
                const aboveBlock = block.above();

                // If the block above is a korbon:fence_gate (an equivalent of air)...
                if (aboveBlock.typeId === 'korbon:redwood_fence_gate') {
                    // ...place the selected block above the current block
                    aboveBlock.setType(selectedItem.typeId);
                    
                    // Reduce item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                    return; // Exit the function after placing the block
                }
            }

            // Toggle the 'korbon:open' state between false and true and determine the sound effect to play
            const currentState = block.permutation.getState('korbon:open');
            const newOpenState = !currentState;
            const sound = newOpenState ? 'open.fence_gate' : 'close.fence_gate';

            // Determine the new cardinal direction based on the player's rotation
            const rotationAngle = player.getRotation().y;
            const newCardinalDirection = getNewCardinalDirection(block.permutation.getState('minecraft:cardinal_direction'), rotationAngle);

            // Update the block's permutation with the new states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open': newOpenState,
                'minecraft:cardinal_direction': newCardinalDirection
            });

            // Apply the new permutation and play the sound
            block.setPermutation(newPermutation);
            block.dimension.playSound(sound, block.location);

            // Corrected: Remove redeclaration of aboveBlock
            const aboveBlock = block.above();
            // Checks if the block above our fence gate is an invisible fence gate (equivalent to air)
            if (aboveBlock.typeId === 'korbon:redwood_fence_gate' && aboveBlock.permutation.getState('korbon:invisible')) {
                const aboveCurrentState = aboveBlock.permutation.getState('korbon:open');
                // Update korbon:open state of the invisible fence gate above our fence gate
                if (aboveCurrentState !== newOpenState) {
                    const newAbovePermutation = BlockPermutation.resolve(aboveBlock.typeId, {
                        ...aboveBlock.permutation.getAllStates(),
                        'korbon:open': newOpenState
                    });
                    aboveBlock.setPermutation(newAbovePermutation);
                }
            }
        }
    });
});









// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_log_on_interact for log interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_log_on_interact', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the selected item from the player's equipment
            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');

            // Use a guard clause to check if the selected item is an axe
            if (!selectedItem?.hasTag('minecraft:is_axe')) return;

            // Get the current block state
            const blockState = block.permutation.getState("minecraft:block_face");
            
            // If block state exists, resolve the stripped log permutation based on the block_face block trait
            if (blockState) {
                const strippedLog = BlockPermutation.resolve('korbon:stripped_baobab_log', {"minecraft:block_face": blockState});
                
                // Set the block permutation to the stripped log
                block.setPermutation(strippedLog);
            }

            // Play wood step sound effect
            player.playSound('step.wood');

            // Get the durability component of the selected item
            const durability = selectedItem.getComponent('durability');

            // Check if the item has a durability component and if its damage is less than the maximum durability
            if (durability && durability.damage < durability.maxDurability) {
                // Increment the damage of the item, reducing its durability
                durability.damage++;
                
                // Update the equipment in the player's main hand with the modified item
                equipment.setEquipment('Mainhand', selectedItem);
            }

            // Check if the item has a durability component and if its damage is greater than or equal to the maximum durability
            if (durability && durability.damage >= durability.maxDurability) {
                // Play the sound effect for breaking an item
                player.playSound('random.break');
                
                // Replace the item in the player's main hand with an air block (i.e., remove the item)
                equipment.setEquipment('Mainhand', new ItemStack('minecraft:air', 1));
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_log_on_interact for log interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_log_on_interact', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the selected item from the player's equipment
            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');

            // Use a guard clause to check if the selected item is an axe
            if (!selectedItem?.hasTag('minecraft:is_axe')) return;

            // Get the current block state
            const blockState = block.permutation.getState("minecraft:block_face");
            
            // If block state exists, resolve the stripped log permutation based on the block_face block trait
            if (blockState) {
                const strippedLog = BlockPermutation.resolve('korbon:stripped_jacaranda_log', {"minecraft:block_face": blockState});
                
                // Set the block permutation to the stripped log
                block.setPermutation(strippedLog);
            }

            // Play wood step sound effect
            player.playSound('step.wood');

            // Get the durability component of the selected item
            const durability = selectedItem.getComponent('durability');

            // Check if the item has a durability component and if its damage is less than the maximum durability
            if (durability && durability.damage < durability.maxDurability) {
                // Increment the damage of the item, reducing its durability
                durability.damage++;
                
                // Update the equipment in the player's main hand with the modified item
                equipment.setEquipment('Mainhand', selectedItem);
            }

            // Check if the item has a durability component and if its damage is greater than or equal to the maximum durability
            if (durability && durability.damage >= durability.maxDurability) {
                // Play the sound effect for breaking an item
                player.playSound('random.break');
                
                // Replace the item in the player's main hand with an air block (i.e., remove the item)
                equipment.setEquipment('Mainhand', new ItemStack('minecraft:air', 1));
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_log_on_interact for log interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_log_on_interact', {
        // Define the behavior when a player interacts with the block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the selected item from the player's equipment
            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');

            // Use a guard clause to check if the selected item is an axe
            if (!selectedItem?.hasTag('minecraft:is_axe')) return;

            // Get the current block state
            const blockState = block.permutation.getState("minecraft:block_face");
            
            // If block state exists, resolve the stripped log permutation based on the block_face block trait
            if (blockState) {
                const strippedLog = BlockPermutation.resolve('korbon:stripped_redwood_log', {"minecraft:block_face": blockState});
                
                // Set the block permutation to the stripped log
                block.setPermutation(strippedLog);
            }

            // Play wood step sound effect
            player.playSound('step.wood');

            // Get the durability component of the selected item
            const durability = selectedItem.getComponent('durability');

            // Check if the item has a durability component and if its damage is less than the maximum durability
            if (durability && durability.damage < durability.maxDurability) {
                // Increment the damage of the item, reducing its durability
                durability.damage++;
                
                // Update the equipment in the player's main hand with the modified item
                equipment.setEquipment('Mainhand', selectedItem);
            }

            // Check if the item has a durability component and if its damage is greater than or equal to the maximum durability
            if (durability && durability.damage >= durability.maxDurability) {
                // Play the sound effect for breaking an item
                player.playSound('random.break');
                
                // Replace the item in the player's main hand with an air block (i.e., remove the item)
                equipment.setEquipment('Mainhand', new ItemStack('minecraft:air', 1));
            }
        }
    });
});







// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_on_interact for slab interaction 
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_slab_on_interact', {
        // Define the behavior when a player interacts with the slab
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is a slab and the block is not already double
            if (selectedItem?.typeId === block.typeId && !block.permutation.getState('korbon:double')) {
                // Check if the interaction is valid based on vertical half and face
                const verticalHalf = block.permutation.getState('minecraft:vertical_half');
                const isBottomUp = verticalHalf === 'bottom' && face === 'Up';
                const isTopDown = verticalHalf === 'top' && face === 'Down';
                if (isBottomUp || isTopDown) {
                    // Reduces item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else if (selectedItem.amount === 1) {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                    // Set block to double and remove water if present
                    block.setPermutation(block.permutation.withState('korbon:double', true));
                    block.setWaterlogged(false);
                    // Play sound effect
                    player.playSound('use.wood');
                }
            }

            // Check if the selected item is a water bucket and the block is not waterlogged or double
            if (selectedItem?.typeId === 'minecraft:water_bucket' && !block.permutation.getState('korbon:waterlogged') && !block.permutation.getState('korbon:double')) {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
                // Set block to waterlogged and place corresponding structure
                block.setPermutation(block.permutation.withState('korbon:waterlogged', true));
                const verticalHalf = block.permutation.getState('minecraft:vertical_half');
                // Split the block identifier and use only the part after the colon
                const slabType = block.typeId.split(':')[1];
                // These structures contains your slab waterlogged, made with an NBT editor
                const structureName = (verticalHalf === 'bottom') ? `mystructure:${slabType}_bottomSlab` : `mystructure:${slabType}_topSlab`;
                const { x, y, z } = block;
                world.structureManager.place(structureName, e.dimension, { x, y, z });
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_on_interact for slab interaction 
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_slab_on_interact', {
        // Define the behavior when a player interacts with the slab
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is a slab and the block is not already double
            if (selectedItem?.typeId === block.typeId && !block.permutation.getState('korbon:double')) {
                // Check if the interaction is valid based on vertical half and face
                const verticalHalf = block.permutation.getState('minecraft:vertical_half');
                const isBottomUp = verticalHalf === 'bottom' && face === 'Up';
                const isTopDown = verticalHalf === 'top' && face === 'Down';
                if (isBottomUp || isTopDown) {
                    // Reduces item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else if (selectedItem.amount === 1) {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                    // Set block to double and remove water if present
                    block.setPermutation(block.permutation.withState('korbon:double', true));
                    block.setWaterlogged(false);
                    // Play sound effect
                    player.playSound('use.wood');
                }
            }

            // Check if the selected item is a water bucket and the block is not waterlogged or double
            if (selectedItem?.typeId === 'minecraft:water_bucket' && !block.permutation.getState('korbon:waterlogged') && !block.permutation.getState('korbon:double')) {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
                // Set block to waterlogged and place corresponding structure
                block.setPermutation(block.permutation.withState('korbon:waterlogged', true));
                const verticalHalf = block.permutation.getState('minecraft:vertical_half');
                // Split the block identifier and use only the part after the colon
                const slabType = block.typeId.split(':')[1];
                // These structures contains your slab waterlogged, made with an NBT editor
                const structureName = (verticalHalf === 'bottom') ? `mystructure:${slabType}_bottomSlab` : `mystructure:${slabType}_topSlab`;
                const { x, y, z } = block;
                world.structureManager.place(structureName, e.dimension, { x, y, z });
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_on_interact for slab interaction 
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_slab_on_interact', {
        // Define the behavior when a player interacts with the slab
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player, face } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Check if the selected item is a slab and the block is not already double
            if (selectedItem?.typeId === block.typeId && !block.permutation.getState('korbon:double')) {
                // Check if the interaction is valid based on vertical half and face
                const verticalHalf = block.permutation.getState('minecraft:vertical_half');
                const isBottomUp = verticalHalf === 'bottom' && face === 'Up';
                const isTopDown = verticalHalf === 'top' && face === 'Down';
                if (isBottomUp || isTopDown) {
                    // Reduces item count if not in creative mode
                    if (player.getGameMode() !== "creative") {
                        if (selectedItem.amount > 1) {
                            selectedItem.amount -= 1;
                            equipment.setEquipment('Mainhand', selectedItem);
                        } else if (selectedItem.amount === 1) {
                            equipment.setEquipment('Mainhand', undefined); // Clear the slot if only 1 item left
                        }
                    }
                    // Set block to double and remove water if present
                    block.setPermutation(block.permutation.withState('korbon:double', true));
                    block.setWaterlogged(false);
                    // Play sound effect
                    player.playSound('use.wood');
                }
            }

            // Check if the selected item is a water bucket and the block is not waterlogged or double
            if (selectedItem?.typeId === 'minecraft:water_bucket' && !block.permutation.getState('korbon:waterlogged') && !block.permutation.getState('korbon:double')) {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
                // Set block to waterlogged and place corresponding structure
                block.setPermutation(block.permutation.withState('korbon:waterlogged', true));
                const verticalHalf = block.permutation.getState('minecraft:vertical_half');
                // Split the block identifier and use only the part after the colon
                const slabType = block.typeId.split(':')[1];
                // These structures contains your slab waterlogged, made with an NBT editor
                const structureName = (verticalHalf === 'bottom') ? `mystructure:${slabType}_bottomSlab` : `mystructure:${slabType}_topSlab`;
                const { x, y, z } = block;
                world.structureManager.place(structureName, e.dimension, { x, y, z });
            }
        }
    });
});





// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_trapdoor_on_interact for trapdoor interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_trapdoor_on_interact', {
        // Define the behavior when a player interacts with the trapdoor block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Get the current state of the 'korbon:open' block trait
            const currentState = block.permutation.getState('korbon:open');

            // Determine the new state of the 'korbon:open' block trait (toggle between true and false)
            const newOpenState = !currentState;

            // Resolve the new block permutation based on the current block type and updated states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open': newOpenState
            });

            // Set the block permutation to the newly resolved permutation
            block.setPermutation(newPermutation);

            // Determine the sound effect to play based on the current state of the trapdoor
            const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';

            // Play the corresponding sound effect for opening or closing the trapdoor
            player.playSound(sound);

            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }

            // Check if the block interacted is a korbon:trapdoor and the player is using a water bucket
            if (block.typeId === 'korbon:baobab_trapdoor' && selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                // Get the structure file with our trapdoor block waterlogged
                const structureName = 'mystructure:baobab_trapdoor';

                // Place the structure
                const { x, y, z } = block.location;
                world.structureManager.place(structureName, e.dimension, { x, y, z });

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_trapdoor_on_interact for trapdoor interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_trapdoor_on_interact', {
        // Define the behavior when a player interacts with the trapdoor block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Get the current state of the 'korbon:open' block trait
            const currentState = block.permutation.getState('korbon:open');

            // Determine the new state of the 'korbon:open' block trait (toggle between true and false)
            const newOpenState = !currentState;

            // Resolve the new block permutation based on the current block type and updated states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open': newOpenState
            });

            // Set the block permutation to the newly resolved permutation
            block.setPermutation(newPermutation);

            // Determine the sound effect to play based on the current state of the trapdoor
            const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';

            // Play the corresponding sound effect for opening or closing the trapdoor
            player.playSound(sound);

            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }

            // Check if the block interacted is a korbon:trapdoor and the player is using a water bucket
            if (block.typeId === 'korbon:jacaranda_trapdoor' && selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                // Get the structure file with our trapdoor block waterlogged
                const structureName = 'mystructure:jacaranda_trapdoor';

                // Place the structure
                const { x, y, z } = block.location;
                world.structureManager.place(structureName, e.dimension, { x, y, z });

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_trapdoor_on_interact for trapdoor interaction
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_trapdoor_on_interact', {
        // Define the behavior when a player interacts with the trapdoor block
        onPlayerInteract(e) {
            // Destructure event data for easier access
            const { block, player } = e;

            // Get the equipment component for the player
            const equipment = player.getComponent('equippable');

            // Get the selected item from the player's mainhand
            const selectedItem = equipment.getEquipment('Mainhand');

            // Get the current state of the 'korbon:open' block trait
            const currentState = block.permutation.getState('korbon:open');

            // Determine the new state of the 'korbon:open' block trait (toggle between true and false)
            const newOpenState = !currentState;

            // Resolve the new block permutation based on the current block type and updated states
            const newPermutation = BlockPermutation.resolve(block.typeId, {
                ...block.permutation.getAllStates(),
                'korbon:open': newOpenState
            });

            // Set the block permutation to the newly resolved permutation
            block.setPermutation(newPermutation);

            // Determine the sound effect to play based on the current state of the trapdoor
            const sound = currentState ? 'open.wooden_trapdoor' : 'close.wooden_trapdoor';

            // Play the corresponding sound effect for opening or closing the trapdoor
            player.playSound(sound);

            // Check if the selected item is a water bucket
            if (selectedItem?.typeId === 'minecraft:water_bucket') {
                // Play sound effect
                player.playSound('bucket.empty_water');
                // If not in creative mode, replace water bucket with empty bucket
                if (player.getGameMode() !== "creative") {
                    equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
                }
            }

            // Check if the block interacted is a korbon:trapdoor and the player is using a water bucket
            if (block.typeId === 'korbon:redwood_trapdoor' && selectedItem?.typeId === 'minecraft:water_bucket') {
                // Save the current block states
                const currentStates = block.permutation.getAllStates();

                // Get the structure file with our trapdoor block waterlogged
                const structureName = 'mystructure:redwood_trapdoor';

                // Place the structure
                const { x, y, z } = block.location;
                world.structureManager.place(structureName, e.dimension, { x, y, z });

                // Get the new block at the same location
                const newBlock = e.dimension.getBlock({ x, y, z });

                // Reapply the old block states to the new block
                const newStates = { ...newBlock.permutation.getAllStates(), ...currentStates };
                const newPermutation = BlockPermutation.resolve(newBlock.typeId, newStates);
                newBlock.setPermutation(newPermutation);
            }
        }
    });
});