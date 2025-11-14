// -End Lightning Strike- //

import {
    world,
    system,
    BlockPermutation
} from "@minecraft/server";

const LIGHTNING_RADIUS = 24;
const lightning_rods = [
     "minecraft:lightning_rod",
    "minecraft:exposed_lightning_rod",
    "minecraft:weathered_lightning_rod",
    "minecraft:oxidized_lightning_rod",
    "minecraft:waxed_lightning_rod",
    "minecraft:waxed_exposed_lightning_rod",
    "minecraft:waxed_weathered_lightning_rod",
    "minecraft:waxed_oxidized_lightning_rod"
    ];
const TARGET_BLOCK_IDS = [
    "wypnt_bab:rotveil",
    "minecraft:crying_obsidian"
];

function findTopStrikeable(dimension, x, startY, z) {
    for (let y = Math.floor(startY); y > 0; y--) {
        const block = dimension.getBlock({ x: Math.floor(x), y, z: Math.floor(z) });
        if (!block) continue;

        const id = block.typeId;
        if (id === "minecraft:air" || id === "minecraft:cave_air" || id === "minecraft:void_air") continue;

        // Only strike if the topmost solid block is in our list
        if (TARGET_BLOCK_IDS.includes(id) || lightning_rods.includes(id)) {
            return { x: Math.floor(x), y: y + 1, z: Math.floor(z), struckBlockId: id }; // Strike just above it
        } else {
            return null; // Abort if it's not a target
        }
    }
    return null;
}

function getRandomPositionOnStrikeable(player, radius) {
    const px = player.location.x;
    const py = player.location.y;
    const pz = player.location.z;

    const dx = (Math.random() * 2 - 1) * radius;
    const dz = (Math.random() * 2 - 1) * radius;

    const x = px + dx;
    const z = pz + dz;

    return findTopStrikeable(player.dimension, x, py + 32, z); // Look a bit above player
}

// FIX 1: Expand vertical search for rods
function findNearbyLightningRod(dimension, center, radius = 4) { // reduced from 8 to 4
    const spiral = [];
    for (let r = 0; r <= radius; r++) {
        for (let dx = -r; dx <= r; dx++) {
            for (let dz = -r; dz <= r; dz++) {
                if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue;
                spiral.push([dx, dz]);
            }
        }
    }
    for (const [dx, dz] of spiral) {
        for (let dy = -5; dy <= 3; dy++) { // reduced from -15..5 to -5..3
            const x = Math.floor(center.x + dx);
            const y = Math.floor(center.y + dy);
            const z = Math.floor(center.z + dz);
            const block = dimension.getBlock({ x, y, z });
            if (block && lightning_rods.includes(block.typeId)) {
                // Check if block above is air or fire
                const above = dimension.getBlock({ x, y: y + 1, z });
                if (
                    above &&
                    (above.typeId.startsWith("minecraft:air") || above.typeId === "minecraft:fire")
                ) {
                    return { x, y: y + 1, z, struckBlockId: block.typeId }; // Strike just above rod
                }
            }
        }
    }
    return null;
}

const rodCache = new Map();

function getCachedRod(player, radius) {
    const now = Date.now();
    const cache = rodCache.get(player.id);
    if (cache && now - cache.time < 10000) { // cache for 10 seconds
        return cache.rodPos;
    }
    const rodPos = findNearbyLightningRod(player.dimension, player.location, radius);
    rodCache.set(player.id, { rodPos, time: now });
    return rodPos;
}

function getStrikePosition(player, radius) {
    // Try up to 10 times to find a valid rotveil biome strike position
    for (let attempt = 0; attempt < 10; attempt++) {
        let pos = null;
        // 90% chance to prioritize lightning rod if present
        if (Math.random() < 0.9) {
            const rodPos = getCachedRod(player, radius);
            if (rodPos) {
                // FIX 2: Remove biome restriction for rods
                pos = rodPos;
            }
        }
        if (!pos) {
            pos = getRandomPositionOnStrikeable(player, radius);
            if (pos) {
                // Only allow if biome is rotveil (== 3)
                const biomeValue = getEndBiomeValue(pos.x, pos.z);
                if (biomeValue !== 3) {
                    pos = null;
                }
            }
        }
        if (pos) {
            return pos;
        }
    }
    return null;
}

const MIN_INTERVAL = 10;
const MAX_INTERVAL = 60;

let playerIndex = 0;

function scheduleLightning() {
    const players = world.getPlayers();
    if (players.length > 0) {
        const player = players[playerIndex % players.length];
        playerIndex++;
        if (player.dimension.id === "minecraft:the_end") {
            const strikePos = getStrikePosition(player, LIGHTNING_RADIUS);
            if (strikePos) {
                player.dimension.spawnEntity("minecraft:lightning_bolt", strikePos);
                player.dimension.createExplosion(
                    strikePos,
                    2,
                    { breaksBlocks: false, causesFire: false }
                );
                try {
                    player.dimension.spawnParticle("wypnt_bab:lightning_sparks", strikePos);
                } catch {}

                let shouldTrySpawn = false;
                let spawnPosition = null;

                if (strikePos.struckBlockId === "minecraft:crying_obsidian") {
                    const baseBlock = player.dimension.getBlock({
                        x: Math.floor(strikePos.x),
                        y: Math.floor(strikePos.y) - 1,
                        z: Math.floor(strikePos.z)
                    });
                    if (baseBlock && baseBlock.typeId === "minecraft:crying_obsidian") {
                        const aboveBlock = player.dimension.getBlock({
                            x: Math.floor(strikePos.x),
                            y: Math.floor(strikePos.y),
                            z: Math.floor(strikePos.z)
                        });
                        if (
                            aboveBlock &&
                            (aboveBlock.typeId.startsWith("minecraft:air") || aboveBlock.typeId === "minecraft:fire")
                        ) {
                            shouldTrySpawn = true;
                            spawnPosition = aboveBlock;
                        }
                    }
                } else if (lightning_rods.includes(strikePos.struckBlockId)) {
                    const rodBlock = player.dimension.getBlock({
                        x: Math.floor(strikePos.x),
                        y: Math.floor(strikePos.y) - 1,
                        z: Math.floor(strikePos.z)
                    });
                    const blockAboveRod = player.dimension.getBlock({
                        x: Math.floor(strikePos.x),
                        y: Math.floor(strikePos.y),
                        z: Math.floor(strikePos.z)
                    });
                    if (
                        rodBlock && lightning_rods.includes(rodBlock.typeId) &&
                        blockAboveRod &&
                        (blockAboveRod.typeId.startsWith("minecraft:air") || blockAboveRod.typeId === "minecraft:fire")
                    ) {
                        shouldTrySpawn = true;
                        spawnPosition = rodBlock;
                    }
                }

                if (shouldTrySpawn && Math.random() < 0.15) {
                    spawnPosition.setType("wypnt_bab:void_fulgurite");
                }
            }
        };
    }

    const nextInterval = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
    system.runTimeout(scheduleLightning, nextInterval);
}
system.run(() => {
scheduleLightning();
})


// -End biome fog- //

const COOLDOWN_MS = 1000;

const FOGS = [
    { tag: "chorus", fog: "chorus_forest_fog", biome: "chorus_forest_fog", block: "wypnt_bab:void_turf" },
    { tag: "velvium", fog: "velvium_fog", biome: "velvium_fog", block: "wypnt_bab:velvium" },
    { tag: "depraved", fog: "depraved_fog", biome: "depraved_fog", block: "wypnt_bab:voidmire" },
    { tag: "rotveil", fog: "rotveil_fog", biome: "rotveil_fog", block: "wypnt_bab:rotveil" },
    { tag: "default", fog: "the_end", biome: "the_end", block: "minecraft:end_stone" }
];

// Noise biome functions located in the below code //

function removeAllEndFogs(player) {
    for (const { fog } of FOGS) {
        try { player.runCommand(`fog @s remove wypnt_bab:${fog}`); } catch {}
    }
    for (const { tag } of FOGS) player.removeTag(tag);
    for (const tag of player.getTags()) {
        if (tag.startsWith("fogCooldown:")) player.removeTag(tag);
    }
}

world.afterEvents.playerDimensionChange.subscribe(ev => {
    if (ev.fromDimension.id === "minecraft:the_end" && ev.toDimension.id !== "minecraft:the_end") {
        removeAllEndFogs(ev.player);
    }
});

function removeEndFogsFromNonEndPlayers() {
    for (const player of world.getAllPlayers()) {
        if (
            player.dimension.id !== "minecraft:the_end" &&
            player.hasTag("end_fog_enabled") &&
            !player.hasTag("end_fog_disabled")
        ) {
            removeAllEndFogs(player);
        }
    }
}

function handleEndFogs() {
    for (const player of world.getAllPlayers()) {
        if (player.dimension.id !== "minecraft:the_end") continue;
        if (!player.hasTag("end_fog_enabled") || player.hasTag("end_fog_disabled")) {
            removeAllEndFogs(player);
            continue;
        }

        const cooldownTag = player.getTags().find(tag => tag.startsWith("fogCooldown:"));
        const lastChange = cooldownTag ? parseInt(cooldownTag.split(":")[1]) * 1000 : 0;
        const now = Date.now();
        if (now - lastChange < COOLDOWN_MS) continue;
        if (cooldownTag) player.removeTag(cooldownTag);
        player.addTag(`fogCooldown:${Math.floor(now / 1000)}`);

        const block = player.dimension.getBlockFromRay(
            { x: player.location.x, y: player.location.y + 1.5, z: player.location.z },
            { x: 0, y: -1, z: 0 },
            { maxDistance: 128, includeLiquidBlocks: false, includePassableBlocks: true }
        )?.block;

        if (!block) continue; // Do nothing if no block found

        const endBiomeValue = getEndBiomeValue(player.location.x, player.location.z);
        const biomeInfo = FOGS[endBiomeValue] ?? FOGS[FOGS.length - 1]; // fallback to default

        // Only change fog if standing above a listed block and not already applied
        if (block.typeId === biomeInfo.block) {
            if (!player.hasTag(biomeInfo.tag)) {
                for (const other of FOGS) {
                    if (other.tag !== biomeInfo.tag) {
                        try { player.runCommand(`fog @s remove wypnt_bab:${other.fog}`); } catch {}
                        player.removeTag(other.tag);
                    }
                }
                player.runCommand(`fog @s push wypnt_bab:${biomeInfo.fog} wypnt_bab:${biomeInfo.biome}`);
                player.addTag(biomeInfo.tag);
            }
        }
        // If not above a listed block, do nothing (keep current fog)
    }
}

system.runInterval(removeEndFogsFromNonEndPlayers, 20);
system.runInterval(handleEndFogs, 1);

// --- Begin: End biome noise functions ---
function noise(x, y) {
    let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
}

function getEndBiomeValue(worldx, worldz) {
    let t_x = worldx / 125.0;
    let t_z = worldz / 125.0;
    let t_rn = Math.abs(
        noise(0.48 * t_x + 3171.3, 0.48 * t_z + 2401.7) * 0.26 +
        noise(0.052 * t_x - 1283.5, 0.052 * t_z - 1283.5)
    );
    let t_o = noise(worldz / 12.7, worldx / 12.7);
    let t_px = t_x / 2.02 + t_o * 0.027 + t_rn;
    let t_pz = t_z / 2.02 + t_o * 0.027 + t_rn;
    let t_c1 = 0.0;
    let t_n1 = 998.7;
    let t_n2 = 998.7;
    for (let i = 0; i < 9; i++) {
        let t_p1x = i % 1;
        let t_p1z = Math.floor(i / 1);
        let t_p2x = Math.floor(t_px) + t_p1x;
        let t_p2z = Math.floor(t_pz) + t_p1z;
        let t_p3x = ((t_p2x * 0.1043) % 1);
        let t_p3y = ((t_p2z * 0.1028) % 1);
        let t_p3z = ((t_p2x * 0.0981) % 1);
        let t_p3d = t_p3x * (t_p3y + 33.37) + t_p3y * (t_p3z + 33.37) + t_p3z * (t_p3x + 33.37);
        t_p3x += t_p3d;
        t_p3y += t_p3d;
        t_p3z += t_p3d;
        let t_rx = ((t_p3x + t_p3y) * t_p3z) % 1;
        let t_rz = ((t_p3x + t_p3z) * t_p3y) % 1;
        let t_d4x = t_p2x + t_rx - t_px;
        let t_d4z = t_p2z + t_rz - t_pz;
        let t_d2 = t_d4x * t_d4x + t_d4z * t_d4z;
        if (t_d2 < t_n1) {
            t_n2 = t_n1;
            t_n1 = t_d2;
            t_c1 = t_rx;
        } else if (t_d2 < t_n2) {
            t_n2 = t_d2;
        }
    }
    return Math.floor(t_c1 * 6.2);
}
// --- End: End biome noise functions ---
