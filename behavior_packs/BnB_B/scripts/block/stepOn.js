import { world, system } from "@minecraft/server";

const activePlayers = new Map(); // Tracks active knockback for players
const toTicks = seconds => seconds * 20;  // Function used to convert seconds to ticks

const PuffshroomComponent = {
    onEntityFallOn(event) {
        const { entity, block, dimension } = event;

        if (block.permutation.matches("wypnt_bab:puffshroom")) {
            const growthState = block.permutation.getState("wypnt_bab:growth");

            if (growthState !== undefined) {
                const knockbackHeights = {
                    0: 0.45,
                    1: 0.66,
                    2: 0.85,
                    3: 1.25,
                };

                const slowFallingDurations = {
                    0: toTicks(1),
                    1: toTicks(1),
                    2: toTicks(2),
                    3: toTicks(3),
                };

                const launchPower = knockbackHeights[growthState] || 0.1;
                const slowFallingDuration = slowFallingDurations[growthState] || 2;

                if (entity?.typeId === "minecraft:player") {
                    // Track player interaction
                    activePlayers.set(entity.id, { launchPower, slowFallingDuration });

                    // Trigger particle effects at block's location
                    const { x, y, z } = block.location;
                    try {
                    dimension.spawnParticle("minecraft:wind_explosion_emitter", block.location) }
                    catch(error) {
                        console.error(`Failed to spawn particle: ${error}`);
                    };

                    // Play sound at the player's position
                    const { x: px, y: py, z: pz } = entity.location;
                    try {
                    entity.playSound("wind_charge.burst", { pitch: 0.3, location: entity.location, volume: 1 }) }
                    catch(error) {
                        console.error(`Failed to play sound: ${error}`);
                    };
                } else {
                    // For mobs, apply impulse to simulate upward motion
                    try {
                        entity.clearVelocity(); // Clear existing velocity
                        entity.applyImpulse({ x: 0, y: launchPower, z: 0 }); // Apply upward motion

                        // Trigger particle effects at mob's location
                        const { x: mx, y: my, z: mz } = entity.location;
                        try {
                        dimension.spawnParticle("minecraft:wind_explosion_emitter", entity.location) }
                        catch(error) {
                            console.error(`Failed to spawn particle for mob: ${error}`);
                        };

                        // Play sound at mob's position
                        try {
                            entity.dimension.playSound("wind_charge.burst", entity.location, { pitch: 0.3, volume: 1 })
                        }   
                        catch(error) {
                            console.error("Failed to play sound for mob: ${error}");
                        };

                        // Apply Slow Falling effect for mobs
                        try {
                        entity.addEffect("slow_falling", slowFallingDuration, { amplifier: 0 }) } 
                        catch(error) {
                            console.error(`Failed to apply Slow Falling effect for mob: ${error}`);
                        };
                    } catch (error) {
                        console.error(`Error applying impulse to mob: ${error}`);
                    }
                }
            }
        }
    },
};

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (activePlayers.has(player.id)) {
            const { launchPower, slowFallingDuration } = activePlayers.get(player.id);
            activePlayers.delete(player.id);

            // Apply knockback to the player
            player.applyKnockback({ x: 0, z: 0 },  launchPower);

            // Apply Slow Falling effect with appropriate duration
            try {
            	player.addEffect("slow_falling", slowFallingDuration, { amplifier: 0 })
             } catch(error) {
                console.error(`Failed to apply Slow Falling effect: ${error}`);
            };
        }
    }
}, 1);

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "wypnt_bab:puffshroom_component",
        PuffshroomComponent
    );
});