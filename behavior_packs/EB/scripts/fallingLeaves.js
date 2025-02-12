import { world, system } from '@minecraft/server';

// Define tick counters for each particle effect
const tickCounters = {
    redwood_detect: 0,
    autumn_detect: 0,
    aspen_detect: 0,
    jacaranda_detect: 0,
    lichen_detect: 0,
    maple_detect: 0,
    cherry_detect: 0
};

// Define particle effect names and their frequencies (in ticks)
const particleEffects = [
    { name: "korbon:redwood_detect", frequency: 60 },    // Every 3 seconds (60 ticks)
    { name: "korbon:autumn_detect", frequency: 50 }, // Every 2.5 seconds (100 ticks)
    { name: "korbon:aspen_detect", frequency: 30 },  // Every 1-2 seconds (30 ticks)
    { name: "korbon:jacaranda_detect", frequency: 120 },// Every 6 seconds (120 ticks)
    { name: "korbon:lichen_detect", frequency: 50 }, // Every 2.5 seconds (50 ticks)
    { name: "korbon:maple_detect", frequency: 150 }, // Every 7.5 seconds (150 ticks)
    { name: "korbon:cherry_detect", frequency: 50 } // Every 2.5 seconds (50 ticks)
];

// Function to play particle effects
function playParticle(player, particleName) {
    player.runCommand(`particle ${particleName} ~~~`);
}

// Subscribe to the tick event
system.runInterval(() => {
    const players = world.getPlayers();

    for (const player of players) {
        particleEffects.forEach(effect => {
            const effectName = effect.name.split(':')[1];
            tickCounters[effectName]++;
            
            if (tickCounters[effectName] >= effect.frequency) {
                playParticle(player, effect.name);
                tickCounters[effectName] = 0; // Reset the counter
            }
        });
    }
}, 1); // Run the interval every tick
