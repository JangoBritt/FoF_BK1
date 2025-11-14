import { system } from "@minecraft/server";

// Subscribe to the 'worldInitialize' event to register custom components
system.beforeEvents.startup.subscribe(eventData => {
    // Register a custom component named wypnt_bab:
    eventData.blockComponentRegistry.registerCustomComponent( 'wypnt_bab:standing_torch', {
        onTick(e) {
            // Destructure event data for easier access
            const { block } = e;

            const isTop = block.permutation.getState('wypnt_bab :top');

            // Check for the block permutation 'wypnt_bab:top'
            if (isTop) {
                // Define the position for the particles when the torch is standing up
                const position = [0.5, 0.7, 0.5];

                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = position;

                // Get the block's current location
                const { x, y, z } = block.location;

                // Calculate the particle spawn position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;

                // Spawn basic_flame_particle
                block.dimension.spawnParticle('minecraft:basic_flame_particle', { x: particleX, y: particleY, z: particleZ });

                // Spawn basic_smoke_particle
                block.dimension.spawnParticle('minecraft:basic_smoke_particle', { x: particleX, y: particleY, z: particleZ });
            }
        }
    });
});
