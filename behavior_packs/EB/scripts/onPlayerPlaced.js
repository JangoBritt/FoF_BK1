// Import necessary modules from Minecraft server API
import { world, BlockPermutation } from '@minecraft/server';

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_fence_on_player_placed for fence placing
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_fence_on_player_placed', {
        // Define behavior when a player places the fence
        onPlace(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Places korbon:fence instead of korbon:fence_inventory and places a korbon:baobab_fence_inventory in top of it, with korbon:post state set to 1 to avoid looping and implement bigger collision
            e.block.setType('korbon:baobab_fence')
            if (aboveBlock.typeId === 'minecraft:air') {
                aboveBlock.setPermutation(BlockPermutation.resolve('korbon:baobab_fence_inventory', { 'korbon:post': 1 }))
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_fence_on_player_placed for fence placing
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_fence_on_player_placed', {
        // Define behavior when a player places the fence
        onPlace(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Places korbon:fence instead of korbon:fence_inventory and places a korbon:jacaranda_fence_inventory in top of it, with korbon:post state set to 1 to avoid looping and implement bigger collision
            e.block.setType('korbon:jacaranda_fence')
            if (aboveBlock.typeId === 'minecraft:air') {
                aboveBlock.setPermutation(BlockPermutation.resolve('korbon:jacaranda_fence_inventory', { 'korbon:post': 1 }))
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_fence_on_player_placed for fence placing
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_fence_on_player_placed', {
        // Define behavior when a player places the fence
        onPlace(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Places korbon:fence instead of korbon:fence_inventory and places a korbon:redwood_fence_inventory in top of it, with korbon:post state set to 1 to avoid looping and implement bigger collision
            e.block.setType('korbon:redwood_fence')
            if (aboveBlock.typeId === 'minecraft:air') {
                aboveBlock.setPermutation(BlockPermutation.resolve('korbon:redwood_fence_inventory', { 'korbon:post': 1 }))
            }
        }
    });
});






// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:baobab_fence_gate_on_player_placed for fence placing
    eventData.blockComponentRegistry.registerCustomComponent('korbon:baobab_fence_gate_on_player_placed', {
        // Define behavior when a player places the fence
        onPlace(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Get all current block states
            const currentStates = block.permutation.getAllStates();

            // Get the current state of the 'minecraft:cardinal_direction' block trait
            const cardinalDirection = currentStates['minecraft:cardinal_direction'];

            // Check if the current cardinal direction is 'south'
            if (cardinalDirection === 'south') {
                // Change the block state 'korbon:direction' from false to true (remember this is the actual south rotation for our fence gate)
                const newkorbonDirection = true;
                currentStates['korbon:direction'] = newkorbonDirection;

                // Update the block's permutation with the new state
                const newPermutation = BlockPermutation.resolve(block.typeId, currentStates);

                // Apply the new permutation to the block
                block.setPermutation(newPermutation);
            }

            // Check if the block above is air
            if (aboveBlock.typeId === 'minecraft:air') {
                // Create a copy of the current block states of our fence gate
                const newAboveStates = { ...currentStates };
    
                // If the cardinal direction is 'south', remove the 'minecraft:cardinal_direction' state (remember we are only using 'south' for inventory render purposes)
                if (cardinalDirection === 'south') {
                    delete newAboveStates['minecraft:cardinal_direction'];
                }
    
                // Set the 'korbon:invisible' state to true for the block above
                newAboveStates['korbon:invisible'] = true;
    
                // Apply the new permutation to the block above using 'korbon:baobab_fence_gate'
                aboveBlock.setPermutation(BlockPermutation.resolve('korbon:baobab_fence_gate', newAboveStates));
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:jacaranda_fence_gate_on_player_placed for fence placing
    eventData.blockComponentRegistry.registerCustomComponent('korbon:jacaranda_fence_gate_on_player_placed', {
        // Define behavior when a player places the fence
        onPlace(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Get all current block states
            const currentStates = block.permutation.getAllStates();

            // Get the current state of the 'minecraft:cardinal_direction' block trait
            const cardinalDirection = currentStates['minecraft:cardinal_direction'];

            // Check if the current cardinal direction is 'south'
            if (cardinalDirection === 'south') {
                // Change the block state 'korbon:direction' from false to true (remember this is the actual south rotation for our fence gate)
                const newkorbonDirection = true;
                currentStates['korbon:direction'] = newkorbonDirection;

                // Update the block's permutation with the new state
                const newPermutation = BlockPermutation.resolve(block.typeId, currentStates);

                // Apply the new permutation to the block
                block.setPermutation(newPermutation);
            }

            // Check if the block above is air
            if (aboveBlock.typeId === 'minecraft:air') {
                // Create a copy of the current block states of our fence gate
                const newAboveStates = { ...currentStates };
    
                // If the cardinal direction is 'south', remove the 'minecraft:cardinal_direction' state (remember we are only using 'south' for inventory render purposes)
                if (cardinalDirection === 'south') {
                    delete newAboveStates['minecraft:cardinal_direction'];
                }
    
                // Set the 'korbon:invisible' state to true for the block above
                newAboveStates['korbon:invisible'] = true;
    
                // Apply the new permutation to the block above using 'korbon:jacaranda_fence_gate'
                aboveBlock.setPermutation(BlockPermutation.resolve('korbon:jacaranda_fence_gate', newAboveStates));
            }
        }
    });
});

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:redwood_fence_gate_on_player_placed for fence placing
    eventData.blockComponentRegistry.registerCustomComponent('korbon:redwood_fence_gate_on_player_placed', {
        // Define behavior when a player places the fence
        onPlace(e) {
            // Destructure event data for easier access
            const { block } = e;
            const aboveBlock = block.above();

            // Get all current block states
            const currentStates = block.permutation.getAllStates();

            // Get the current state of the 'minecraft:cardinal_direction' block trait
            const cardinalDirection = currentStates['minecraft:cardinal_direction'];

            // Check if the current cardinal direction is 'south'
            if (cardinalDirection === 'south') {
                // Change the block state 'korbon:direction' from false to true (remember this is the actual south rotation for our fence gate)
                const newkorbonDirection = true;
                currentStates['korbon:direction'] = newkorbonDirection;

                // Update the block's permutation with the new state
                const newPermutation = BlockPermutation.resolve(block.typeId, currentStates);

                // Apply the new permutation to the block
                block.setPermutation(newPermutation);
            }

            // Check if the block above is air
            if (aboveBlock.typeId === 'minecraft:air') {
                // Create a copy of the current block states of our fence gate
                const newAboveStates = { ...currentStates };
    
                // If the cardinal direction is 'south', remove the 'minecraft:cardinal_direction' state (remember we are only using 'south' for inventory render purposes)
                if (cardinalDirection === 'south') {
                    delete newAboveStates['minecraft:cardinal_direction'];
                }
    
                // Set the 'korbon:invisible' state to true for the block above
                newAboveStates['korbon:invisible'] = true;
    
                // Apply the new permutation to the block above using 'korbon:redwood_fence_gate'
                aboveBlock.setPermutation(BlockPermutation.resolve('korbon:redwood_fence_gate', newAboveStates));
            }
        }
    });
});