import { world, system } from "@minecraft/server";

// Subscribe to the 'worldInitialize' event to register custom components
system.beforeEvents.startup.subscribe(eventData => {
    // Register a custom component named wypnt_bab:whispering_willow for ambient sounds
    eventData.blockComponentRegistry.registerCustomComponent('wypnt_bab:whispering_willow', {
        onTick(e) {
            // Destructure event data for easier access
            const { block } = e;

            // Check if the block is of type 'wypnt_bab:whispering_willow'
            if (block.typeId === 'wypnt_bab:whispering_willow') {

                const position = [0.1, 0.3, 0.1];

                // Adjust particle position to bottom center of the block
                const particleposition = [0.5, 0.0, 0.5];

                const sound = 'block.wypnt_bab.whispering_willow.ambient';

                const particle = 'wypnt_bab:whispering_soul_particle';

                // Destructure position into x, y, z coordinates
                const [offsetX, offsetY, offsetZ] = particleposition;

                // Get the block's current location
                const { x, y, z } = block.location;

                // Calculate the particle position
                const particleX = x + offsetX;
                const particleY = y + offsetY;
                const particleZ = z + offsetZ;

                // Play the sound regardless of player proximity
                block.dimension.playSound(sound, block.location);

                // Find if any player is within 15 blocks of the current block
                const players = world.getPlayers();
                let playerNearby = false;

                for (const player of players) {
                    const playerLocation = player.location;
                    const distance = Math.sqrt(
                        Math.pow(playerLocation.x - x, 2) +
                        Math.pow(playerLocation.y - y, 2) +
                        Math.pow(playerLocation.z - z, 2)
                    );

                    if (distance <= 15) {
                        playerNearby = true;
                        break;
                    }
                }

                // Check if the component should be active or inactive
                const isActive = block.permutation.getState('wypnt_bab:is_active');

                if (playerNearby && !isActive) {
                    // Spawn the particle
                    block.dimension.spawnParticle(particle, { x: particleX, y: particleY, z: particleZ });

                    // Set the 'wypnt_bab:is_active' state to true
                    block.setPermutation(block.permutation.withState("wypnt_bab:is_active", true));
                } else if (!playerNearby && isActive) {
                    // Set the 'wypnt_bab:is_active' state back to false
                    block.setPermutation(block.permutation.withState("wypnt_bab:is_active", false));
                }
            }
        }
    });
});
