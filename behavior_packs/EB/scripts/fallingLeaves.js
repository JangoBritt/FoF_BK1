// Import necessary modules from Minecraft server API
import { world, MolangVariableMap } from '@minecraft/server';

// Initialize a timer variable
let timer = 0;

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named korbon:fallingleaves for torch particles
    eventData.blockComponentRegistry.registerCustomComponent('korbon:fallingleaves', {
        onRandomTick(e) {
            // Increment the timer every tick
            timer++;

            // Destructure event data for easier access
            const { block } = e;

            // Get the block's current location
            const { x, y, z } = block.location;

            // Get the air block below the leaf block
            const belowBlock = block.below();

            // Check if the block is of type 'korbon:aspen_leaves', the block below is air, and the timer has reached 5 ticks
            if (block.typeId === 'korbon:aspen_leaves' && belowBlock.typeId === 'minecraft:air' && timer >= 5) {
                // Reset the timer
                timer = 0;

                // Define the position for the particles
                const position = [0, 0, 0];

                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = position;

                // Calculate the particle spawn position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;

                // Create an empty MolangVariableMap
                const molangVariables = new MolangVariableMap();

                // Spawn minecraft:aspen_leaves particles
                block.dimension.spawnParticle('minecraft:aspen_leaves', { x: particleX, y: particleY, z: particleZ }, molangVariables);
            }

            if (block.typeId === 'korbon:jacaranda_leaves' && belowBlock.typeId === 'minecraft:air' && timer >= 17) {
                // Reset the timer
                timer = 0;

                // Define the position for the particles
                const position = [0, 0, 0];

                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = position;

                // Calculate the particle spawn position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;

                // Create an empty MolangVariableMap
                const molangVariables = new MolangVariableMap();

                // Spawn minecraft:jacaranda_leaves particles
                block.dimension.spawnParticle('minecraft:jacaranda_leaves', { x: particleX, y: particleY, z: particleZ }, molangVariables);
            }

            if (block.typeId === 'korbon:redwood_leaves' && belowBlock.typeId === 'minecraft:air' && timer >= 70) {
                // Reset the timer
                timer = 0;
            
                // Define the position for the particles
                const position = [0, 0, 0];
            
                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = position;
            
                // Calculate the particle spawn position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;
            
                // Create an empty MolangVariableMap
                const molangVariables = new MolangVariableMap();
            
                // Choose a random particle type with a 85% chance of redwood_leaves being chosen
                const particleType = Math.random() < 0.85 ? 'korbon:redwood_leaves' : 'korbon:redwood_cone';
            
                // Spawn the chosen particle
                block.dimension.spawnParticle(particleType, { x: particleX, y: particleY, z: particleZ }, molangVariables);
            }
            

            if (block.typeId === 'korbon:autumn_oak_leaves' || block.typeId === 'korbon:autumn_oak_leaves2' && belowBlock.typeId === 'minecraft:air' && timer >= 15) {
                // Reset the timer
                timer = 0;

                // Define the position for the particles
                const position = [0, 0, 0];

                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = position;

                // Calculate the particle spawn position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;

                // Create an empty MolangVariableMap
                const molangVariables = new MolangVariableMap();

                // Spawn minecraft:jacaranda_leaves particles
                block.dimension.spawnParticle('minecraft:autumn_leaves', { x: particleX, y: particleY, z: particleZ }, molangVariables);
            }
        }
    });
});
