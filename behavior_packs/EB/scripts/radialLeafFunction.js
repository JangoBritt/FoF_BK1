//bridge-file-version: #55
import { world, BlockPermutation } from "@minecraft/server";


world.beforeEvents.worldInitialize.subscribe(initEvent => {
    let tickCount = 0; // Initialize a counter for ticks
    const validLogBlocks = new Set(["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log", "korbon:redwood_log", "korbon:baobab_log", "korbon:jacaranda_log", "korbon:redwood_wood", "korbon:baobab_wood", "korbon:jacaranda_wood"]);
    const radius = 4; // Change this value to adjust the radius

    function isWithinSphere(blockLoc, center, radius) {
        const dx = blockLoc.x - center.x;
        const dy = blockLoc.y - center.y;
        const dz = blockLoc.z - center.z;
        const distanceSquared = dx * dx + dy * dy + dz * dz;
        return distanceSquared <= radius * radius;
    }

    initEvent.blockComponentRegistry.registerCustomComponent('pog:jacarandaleavesDecay', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            tickCount++; // Increment the tick counter
            if (tickCount < 4) { // Skip execution if 1 seconds (10 ticks) haven't passed
                return;
            }
            tickCount = 0; // Reset the tick counter

            const loc = e.block.location;
            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            outer: for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(blockLoc); // Get block using getMaterial
                            // Check for any log type (modify as needed)
                            if (validLogBlocks.has(block?.typeId)) {
                                foundLog = true; // Set flag if a log is found
                                break outer; // Exit all loops if a log is found
                            }
                        }
                    }
                    if (foundLog) {
                        break; // Exit the loop if a log is found
                    }
                }
                if (foundLog) {
                    break; // Exit the loop if a log is found
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/jacaranda_leaves_drops"`);
                }
            }
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    let tickCount = 0; // Initialize a counter for ticks
    const validLogBlocks = new Set(["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log", "korbon:redwood_log", "korbon:baobab_log", "korbon:jacaranda_log", "korbon:redwood_wood", "korbon:baobab_wood", "korbon:jacaranda_wood"]);
    const radius = 3; // Change this value to adjust the radius

    function isWithinSphere(blockLoc, center, radius) {
        const dx = blockLoc.x - center.x;
        const dy = blockLoc.y - center.y;
        const dz = blockLoc.z - center.z;
        const distanceSquared = dx * dx + dy * dy + dz * dz;
        return distanceSquared <= radius * radius;
    }

    initEvent.blockComponentRegistry.registerCustomComponent('pog:aspenleavesDecay', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            tickCount++; // Increment the tick counter
            if (tickCount < 4) { // Skip execution if 1 seconds (10 ticks) haven't passed
                return;
            }
            tickCount = 0; // Reset the tick counter

            const loc = e.block.location;
            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            outer: for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(blockLoc); // Get block using getMaterial
                            // Check for any log type (modify as needed)
                            if (validLogBlocks.has(block?.typeId)) {
                                foundLog = true; // Set flag if a log is found
                                break outer; // Exit all loops if a log is found
                            }
                        }
                    }
                    if (foundLog) {
                        break; // Exit the loop if a log is found
                    }
                }
                if (foundLog) {
                    break; // Exit the loop if a log is found
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/aspen_leaves_drops"`);
                }
            }
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    let tickCount = 0; // Initialize a counter for ticks
    const validLogBlocks = new Set(["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log", "korbon:redwood_log", "korbon:baobab_log", "korbon:jacaranda_log", "korbon:redwood_wood", "korbon:baobab_wood", "korbon:jacaranda_wood"]);
    const radius = 3; // Change this value to adjust the radius

    function isWithinSphere(blockLoc, center, radius) {
        const dx = blockLoc.x - center.x;
        const dy = blockLoc.y - center.y;
        const dz = blockLoc.z - center.z;
        const distanceSquared = dx * dx + dy * dy + dz * dz;
        return distanceSquared <= radius * radius;
    }

    initEvent.blockComponentRegistry.registerCustomComponent('pog:baobableavesDecay', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            tickCount++; // Increment the tick counter
            if (tickCount < 4) { // Skip execution if 1 seconds (10 ticks) haven't passed
                return;
            }
            tickCount = 0; // Reset the tick counter

            const loc = e.block.location;
            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            outer: for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(blockLoc); // Get block using getMaterial
                            // Check for any log type (modify as needed)
                            if (validLogBlocks.has(block?.typeId)) {
                                foundLog = true; // Set flag if a log is found
                                break outer; // Exit all loops if a log is found
                            }
                        }
                    }
                    if (foundLog) {
                        break; // Exit the loop if a log is found
                    }
                }
                if (foundLog) {
                    break; // Exit the loop if a log is found
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/baobab_leaves_drops"`);
                }
            }
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    let tickCount = 0; // Initialize a counter for ticks
    const validLogBlocks = new Set(["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log", "korbon:redwood_log", "korbon:baobab_log", "korbon:jacaranda_log", "korbon:redwood_wood", "korbon:baobab_wood", "korbon:jacaranda_wood"]);
    const radius = 3; // Change this value to adjust the radius

    function isWithinSphere(blockLoc, center, radius) {
        const dx = blockLoc.x - center.x;
        const dy = blockLoc.y - center.y;
        const dz = blockLoc.z - center.z;
        const distanceSquared = dx * dx + dy * dy + dz * dz;
        return distanceSquared <= radius * radius;
    }

    initEvent.blockComponentRegistry.registerCustomComponent('pog:autumnleavesDecay', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            tickCount++; // Increment the tick counter
            if (tickCount < 4) { // Skip execution if 1 seconds (10 ticks) haven't passed
                return;
            }
            tickCount = 0; // Reset the tick counter

            const loc = e.block.location;
            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            outer: for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(blockLoc); // Get block using getMaterial
                            // Check for any log type (modify as needed)
                            if (validLogBlocks.has(block?.typeId)) {
                                foundLog = true; // Set flag if a log is found
                                break outer; // Exit all loops if a log is found
                            }
                        }
                    }
                    if (foundLog) {
                        break; // Exit the loop if a log is found
                    }
                }
                if (foundLog) {
                    break; // Exit the loop if a log is found
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/autumn_oak_leaves_drops"`);
                }
            }
        }
    });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    let tickCount = 0; // Initialize a counter for ticks
    const validLogBlocks = new Set(["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log", "korbon:redwood_log", "korbon:baobab_log", "korbon:jacaranda_log", "korbon:redwood_wood", "korbon:baobab_wood", "korbon:jacaranda_wood"]);
    const radius = 3; // Change this value to adjust the radius

    function isWithinSphere(blockLoc, center, radius) {
        const dx = blockLoc.x - center.x;
        const dy = blockLoc.y - center.y;
        const dz = blockLoc.z - center.z;
        const distanceSquared = dx * dx + dy * dy + dz * dz;
        return distanceSquared <= radius * radius;
    }

    initEvent.blockComponentRegistry.registerCustomComponent('pog:mapleleavesDecay', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            tickCount++; // Increment the tick counter
            if (tickCount < 4) { // Skip execution if 1 seconds (10 ticks) haven't passed
                return;
            }
            tickCount = 0; // Reset the tick counter

            const loc = e.block.location;
            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            outer: for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(blockLoc); // Get block using getMaterial
                            // Check for any log type (modify as needed)
                            if (validLogBlocks.has(block?.typeId)) {
                                foundLog = true; // Set flag if a log is found
                                break outer; // Exit all loops if a log is found
                            }
                        }
                    }
                    if (foundLog) {
                        break; // Exit the loop if a log is found
                    }
                }
                if (foundLog) {
                    break; // Exit the loop if a log is found
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/maple_leaves_drops"`);
                }
            }
        }
    });
});