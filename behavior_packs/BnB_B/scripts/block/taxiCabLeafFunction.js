import { world, system } from "@minecraft/server";

// Define valid logs for decay checking
const validLogBlocks = new Set([
    "wypnt_bab:fir_log", "wypnt_bab:chorus_log", "wypnt_bab:chorus_wood", "wypnt_bab:forsaken_oak_log", "wypnt_bab:maple_log", "wypnt_bab:jacaranda_log", "wypnt_bab:willow_log", "wypnt_bab:redwood_log", "wypnt_bab:baobab_log",
    "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log",
    "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log",
    "minecraft:jungle_log", "minecraft:oak_log", "minecraft:pale_oak_log"
]);

// Define leaf loot tables
const lootTables = {
    "wypnt_bab:fir_leaves": "coreblockstudios/biomesandbeyond/blocks/fir_leaves_drops",
    "wypnt_bab:aspen_leaves": "coreblockstudios/biomesandbeyond/blocks/aspen_leaves_drops",
    "wypnt_bab:jacaranda_leaves": "coreblockstudios/biomesandbeyond/blocks/jacaranda_leaves_drops",
    "wypnt_bab:redwood_leaves": "coreblockstudios/biomesandbeyond/blocks/redwood_leaves_drops",
    "wypnt_bab:autumn_leaves": "coreblockstudios/biomesandbeyond/blocks/autumn_leaves_drops",
    "wypnt_bab:baobab_leaves": "coreblockstudios/biomesandbeyond/blocks/baobab_leaves_drops",
    "wypnt_bab:maple_leaves": "coreblockstudios/biomesandbeyond/blocks/maple_leaves_drops",
    "wypnt_bab:maple_yellow_leaves": "coreblockstudios/biomesandbeyond/blocks/maple_leaves_drops",
    "wypnt_bab:forsaken_oak_leaves": "coreblockstudios/biomesandbeyond/blocks/forsaken_oak_leaves_drops",
    "wypnt_bab:chorus_leaves": "coreblockstudios/biomesandbeyond/blocks/chorus_leaves_drops",
    "wypnt_bab:popped_chorus_leaves": "coreblockstudios/biomesandbeyond/blocks/chorus_leaves_popped_drops",
    "korbon:cherry_blossom_leaves": "blocks/cherry_blossom_leaves_drops"
};

// Define leaf decay radius per type
const leafRadii = {
    "wypnt_bab:fir_leaves": 5, "wypnt_bab:aspen_leaves": 4, "wypnt_bab:jacaranda_leaves": 6,
    "wypnt_bab:redwood_leaves": 4, "wypnt_bab:autumn_leaves": 5, "wypnt_bab:baobab_leaves": 4,
    "wypnt_bab:maple_leaves": 4, "wypnt_bab:maple_yellow_leaves": 4, "wypnt_bab:forsaken_oak_leaves": 4,
    "wypnt_bab:chorus_leaves": 5, "wypnt_bab:popped_chorus_leaves": 5, "korbon:cherry_blossom_leaves": 4
};

// LRU Cache for log searches
const decayCache = new Map();
const MAX_CACHE_SIZE = 5000;

// Directional offsets for checking logs (precomputed per radius for optimization)
const logOffsetsByRadius = {};
for (let radius = 1; radius <= 6; radius++) {
    const offsets = [];
    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                offsets.push({ x, y, z }); // Use full cube, not sphere
            }
        }
    }
    logOffsetsByRadius[radius] = offsets;
}

// Queue for batch leaf decay processing
const leafDecayQueue = [];

// Check if a log exists nearby
function hasNearbyLog(block, radius) {
    const loc = block.location;
    const cacheKey = `${loc.x},${loc.y},${loc.z},${radius}`;

    if (decayCache.has(cacheKey)) {
        // Move accessed key to end for LRU
        const value = decayCache.get(cacheKey);
        decayCache.delete(cacheKey);
        decayCache.set(cacheKey, value);
        return value;
    }

    let foundLog = false;
    const offsets = logOffsetsByRadius[radius] || [];
    for (let i = 0; i < offsets.length; i++) {
        const offset = offsets[i];
        const checkLoc = {
            x: loc.x + offset.x,
            y: loc.y + offset.y,
            z: loc.z + offset.z
        };
        const nearbyBlock = block.dimension.getBlock(checkLoc);
        if (!nearbyBlock) continue;
        if (validLogBlocks.has(nearbyBlock.typeId)) {
            foundLog = true;
            break;
        }
    }

    // Store in cache (LRU: move oldest out)
    decayCache.set(cacheKey, foundLog);
    if (decayCache.size > MAX_CACHE_SIZE) {
        // Remove oldest entry
        const oldestKey = decayCache.keys().next().value;
        decayCache.delete(oldestKey);
    }

    return foundLog;
}

// Process the leaf decay queue in batches
function processLeafDecayQueue() {
    if (leafDecayQueue.length === 0) return;

    const batchSize = Math.min(leafDecayQueue.length, 75); // Increased to 75 leaves per tick
    for (let i = 0; i < batchSize; i++) {
        const { block, blockType } = leafDecayQueue.shift();
        if (!block) continue;

        try {
        const isPlayerPlaced = block.permutation.getState("wypnt_bab:playerPlaced");
        if (isPlayerPlaced) continue;  // Skip if the block was placed by the player
        } catch(err) { return; }

        const radius = leafRadii[blockType];
        if (!radius) continue;

        if (!hasNearbyLog(block, radius)) {
            const lootTable = lootTables[blockType] || "blocks/default_loot";
            block.setType("air");
            block.dimension.runCommand(`loot spawn ${block.location.x} ${block.location.y} ${block.location.z} loot "${lootTable}"`);
        }
    }
}

// Function to restart the script
function restartScript() {
    // Clear the leaf decay queue
    leafDecayQueue.length = 0;
    // Clear the cache
    decayCache.clear();
}

// Run decay queue processing every few ticks
system.runInterval(processLeafDecayQueue, 5); // Every 5 ticks (0.25 seconds)

// Schedule script restart every 3 minutes (3600 ticks)
system.runInterval(restartScript, 3600); // Every 3 minutes

// Register the custom component for leaf decay
system.beforeEvents.startup.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('wypnt_bab:leaf_decay', {
        beforeOnPlayerPlace: e => {
            // Properly set the state with 'permutationToPlace'
            e.permutationToPlace = e.permutationToPlace.withState('wypnt_bab:playerPlaced', true);  // Tag the block as player-placed
        },
        onRandomTick: e => {
            if (Math.random() < 0.2) return; // Now 20% chance to skip tick (less queue growth)

            const blockType = e.block.typeId;
            if (!leafRadii[blockType]) return;

            leafDecayQueue.push({ block: e.block, blockType });
        }
    });
});