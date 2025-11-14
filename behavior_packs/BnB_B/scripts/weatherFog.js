import { world, system } from '@minecraft/server';

const NEARBY_TAG = 'weather_detect_nearby';
const RADIUS = 64;
const RADIUS_SQ = RADIUS * RADIUS;
const INTERVAL = 20;
const CHECK_EVERY = 5;

let tickSkip = 0;

system.runInterval(() => {
    tickSkip++;
    if (tickSkip < CHECK_EVERY) return;
    tickSkip = 0;

    const players = world.getPlayers();
    if (players.length === 0) return;

    const entities = world.getDimension('overworld').getEntities({ type: 'wypnt_bab:weather_detect' });
    if (entities.length === 0) {
        for (const player of players) {
            if (player.hasTag(NEARBY_TAG)) {
                try { player.runCommand('function sandstorm_fog_remove'); } catch {}
                player.removeTag(NEARBY_TAG);
            }
        }
        return;
    }

    const entityPositions = entities.map(e => e.location);

    for (const player of players) {
        const playerPos = player.location;
        let entityNearby = false;
        for (let i = 0; i < entityPositions.length; i++) {
            const entityPos = entityPositions[i];
            const dx = entityPos.x - playerPos.x;
            const dy = entityPos.y - playerPos.y;
            const dz = entityPos.z - playerPos.z;
            if ((dx * dx + dy * dy + dz * dz) <= RADIUS_SQ) {
                entityNearby = true;
                break;
            }
        }
        if (entityNearby) {
            if (!player.hasTag(NEARBY_TAG)) {
                try { player.runCommand('function sandstorm_fog'); } catch {}
                player.addTag(NEARBY_TAG);
            }
        } else if (player.hasTag(NEARBY_TAG)) {
            try { player.runCommand('function sandstorm_fog_remove'); } catch {}
            player.removeTag(NEARBY_TAG);
        }
    }
}, INTERVAL);
