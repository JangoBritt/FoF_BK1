import { world, system, Player } from '@minecraft/server';

class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    normalized() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) || 1;
        return new Vec3(this.x / length, this.y / length, this.z / length);
    }
    multiply(scalar) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    add(vec) {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }
    static cross(v1, v2) {
        return new Vec3(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    }
}

const tickCounters = new Map();
const cachedStates = new Map();
const playerViewCache = new Map(); // Cache for player view directions
let globalParticleCount = 0; // Global particle counter
const MAX_GLOBAL_PARTICLES = 80; // Maximum allowed global particles
// Leaf particle effects
const animations = [
    { name: "wypnt_bab:aspen_detect", frequency: 70 },
    { name: "wypnt_bab:autumn_detect", frequency: 45 },
    { name: "wypnt_bab:fir_detect", frequency: 80 },
    { name: "wypnt_bab:jacaranda_detect", frequency: 40 },
    { name: "wypnt_bab:jacaranda_lantern_detect", frequency: 60 },
    { name: "wypnt_bab:maple_detect", frequency: 60 },
    { name: "wypnt_bab:brittlebright_detect", frequency: 60 },
    { name: "wypnt_bab:lichen_detect", frequency: 50 },
    { name: "wypnt_bab:forsaken_oak_detect", frequency: 60 },
    { name: "wypnt_bab:chorus_detect", frequency: 80 },
    { name: "wypnt_bab:pink_chorus_detect", frequency: 50 },
    { name: "wypnt_bab:velvium_bulb_detect", frequency: 50 },
    { name: "wypnt_bab:depraved_flower_detect", frequency: 10 },
    { name: "wypnt_bab:void_turf_detect", frequency: 80 },
    { name: "wypnt_bab:spore_chute_detect", frequency: 40 },
];

// Clean up player data when leaving
world.afterEvents.playerLeave.subscribe(e => {
    tickCounters.delete(e.playerId);
    cachedStates.delete(e.playerId);
    playerViewCache.delete(e.playerId);
});

// Periodic cleanup of stale player data
system.runInterval(() => {
    for (const [playerId] of tickCounters) {
        const player = world.getPlayers().find(p => p.id === playerId);
        if (!player) {
            tickCounters.delete(playerId);
            cachedStates.delete(playerId);
            playerViewCache.delete(playerId);
        }
    }
}, 600);

function calculateLocalCoordinates(player, localCoordinates) {
    let cachedView = playerViewCache.get(player.id);
    const zVec = player.getViewDirection();

    if (!cachedView || cachedView.zVec.x !== zVec.x || cachedView.zVec.y !== zVec.y || cachedView.zVec.z !== zVec.z) {
        const xVec = new Vec3(zVec.z, 0, -zVec.x).normalized();
        const yVec = Vec3.cross(zVec, xVec).normalized();
        cachedView = { zVec, xVec, yVec };
        playerViewCache.set(player.id, cachedView);
    }

    return cachedView.xVec.multiply(localCoordinates.x)
        .add(cachedView.yVec.multiply(localCoordinates.y))
        .add(new Vec3(cachedView.zVec.x, cachedView.zVec.y, cachedView.zVec.z).multiply(localCoordinates.z));
}

function spawnParticleEffectForPlayer(player, effect) {
    if (!player || globalParticleCount >= MAX_GLOBAL_PARTICLES) return;

    const playerPos = player.location;
    const x = Math.round(playerPos.x);
    const y = Math.round(playerPos.y);
    const z = Math.round(playerPos.z);

    // Check if the chunk is loaded by trying to get the block at the location
    let blockLoaded = true;
    try {
        const block = player.dimension.getBlock({ x, y, z });
        if (!block) blockLoaded = false;
    } catch {
        blockLoaded = false;
    }
    if (!blockLoaded) return;

    try {
        player.spawnParticle(`${effect}`, { x, y, z });
        globalParticleCount++;
        system.runTimeout(() => globalParticleCount--, 15);
    } catch (error) {
        console.error(`Failed to spawn particle effect '${effect}' for player ${player.name}:`, error);
    }
}

function isInLoadedChunk(x, z) {
    return Math.abs(x) < 30000000 && Math.abs(z) < 30000000;
}

function initializePlayerData(playerId) {
    if (!tickCounters.has(playerId)) {
        tickCounters.set(playerId, Object.fromEntries(animations.map(effect => [effect.name, 0])));
    }
    if (!cachedStates.has(playerId)) {
        cachedStates.set(playerId, Object.fromEntries(animations.map(effect => [effect.name, 'waiting'])));
    }
}

function updatePlayerEffects(player, playerId) {
    const playerTickCounter = tickCounters.get(playerId);
    const playerCache = cachedStates.get(playerId);

    if (!player.hasTag("leaf_enabled") || player.hasTag("leaf_disabled")) return;

    for (let i = 0; i < animations.length; i++) {
        const effect = animations[i];
        playerTickCounter[effect.name]++;
        if (playerTickCounter[effect.name] >= effect.frequency) {
            if (playerCache[effect.name] === 'waiting') {
                spawnParticleEffectForPlayer(player, effect.name);
                playerCache[effect.name] = 'triggered';
                playerTickCounter[effect.name] = 0;
            }
        } else if (playerCache[effect.name] === 'triggered') {
            playerCache[effect.name] = 'waiting';
        }
    }
}


let playerIndex = 0;

system.runInterval(() => {
    const players = world.getPlayers({ tags: ["leaf_enabled"], excludeTags: ["leaf_disabled"] });
    if (players.length === 0) return;

    const dynamicBatchSize = Math.max(1, Math.floor(players.length / 15));
    for (let i = 0; i < dynamicBatchSize && playerIndex < players.length; i++, playerIndex++) {
        const player = players[playerIndex];
        if (!player) continue;
        const playerId = player.id;
        initializePlayerData(playerId);
        updatePlayerEffects(player, playerId);
    }
    if (playerIndex >= players.length) playerIndex = 0;
}, 3);


// End Biome Particle Effects

const PARTICLE_BIOMES = [
    { biomeIndex: 0, particle: "wypnt_bab:chorus_mist", block: "wypnt_bab:void_turf" },
    { biomeIndex: 1, particle: "wypnt_bab:velvium_particle", block: "wypnt_bab:velvium" },
    { biomeIndex: 2, particle: "wypnt_bab:depraved_particle", block: "wypnt_bab:voidmire" },
];

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

// Store last particle time per player
const lastParticleTimes = new Map();

function handleBiomeParticles() {
    const players = world.getPlayers({ tags: ["leaf_enabled"], excludeTags: ["leaf_disabled"] });
    for (const player of players) {
        if (player.dimension.id !== "minecraft:the_end") continue;

        const biomeIndex = getEndBiomeValue(player.location.x, player.location.z);
        const biomeParticle = PARTICLE_BIOMES.find(b => b.biomeIndex === biomeIndex);
        if (!biomeParticle) continue;

        // Get the block directly under the player
        const block = player.dimension.getBlock({
            x: Math.floor(player.location.x),
            y: Math.floor(player.location.y - 1),
            z: Math.floor(player.location.z)
        });
        if (!block || block.typeId !== biomeParticle.block) continue;

        const now = Date.now();
        const lastTime = lastParticleTimes.get(player.id) || 0;

        if (now - lastTime >= 3000) { // 3 seconds
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 1.5 + Math.random() * 1.5;
                const px = player.location.x + Math.cos(angle) * radius;
                const py = player.location.y + 1 + Math.random() * 1.5;
                const pz = player.location.z + Math.sin(angle) * radius;
                try {
                    player.spawnParticle(biomeParticle.particle, { x: px, y: py, z: pz });
                } catch {}
            }
            lastParticleTimes.set(player.id, now);
        }
    }
}

system.runInterval(handleBiomeParticles, 20);