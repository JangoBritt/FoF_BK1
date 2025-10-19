import { world, system } from "@minecraft/server";

let targetPlayers = new Set();
let targetPlayersSwift = new Set();
let playerArmorCache = new Map(); // Cache for player armor data
const toTicks = seconds => seconds * 20;  // Function used to convert seconds to ticks

system.runInterval(() => {
    let players = world.getAllPlayers();
    players.forEach(player => {
        checkPlayerArmor(player);
    });
}, 200); // Check every 200ms

function checkPlayerArmor(player) {
    const equippable = player.getComponent("equippable");
    if (!equippable) return;

    const headArmor = equippable.getEquipment("Head");
    const chestArmor = equippable.getEquipment("Chest");
    const legArmor = equippable.getEquipment("Legs");
    const footArmor = equippable.getEquipment("Feet");

    const currentArmorSet = [
        headArmor?.typeId,
        chestArmor?.typeId,
        legArmor?.typeId,
        footArmor?.typeId
    ];

    // Check if the armor set is cached and if it has changed
    const cachedArmorSet = playerArmorCache.get(player.id);

    if (cachedArmorSet && arraysAreEqual(cachedArmorSet, currentArmorSet)) {
        return; // No change in armor, no need to update
    }

    // Cache the new armor set
    playerArmorCache.set(player.id, currentArmorSet);

    if (
        headArmor?.typeId === "wypnt_bab:tungsten_helmet" &&
        chestArmor?.typeId === "wypnt_bab:tungsten_chestplate" &&
        legArmor?.typeId === "wypnt_bab:tungsten_leggings" &&
        footArmor?.typeId === "wypnt_bab:tungsten_boots"
    ) {
        targetPlayers.add(player);
    } else {
        targetPlayers.delete(player);
    }

    if(
        footArmor?.typeId === "wypnt_bab:swiftrunner_boots"
    ) {
        targetPlayersSwift.add(player);
    } else {
        targetPlayersSwift.delete(player);
    }
}

let lastApplied = {};

system.runInterval(() => {
    const now = Date.now();
    targetPlayers.forEach(player => {
        if (!lastApplied[player.id] || now - lastApplied[player.id] >= 2000) { // Every 2 seconds
            try {
                player.addEffect("fire_resistance", toTicks(6), { amplifier: 0 }); // Fire Resistance (6s)
                lastApplied[player.id] = now;
            } catch (error) {
                console.warn(`Failed to apply fire resistance to ${player.name}: ${error}`);
            }
        }
    });
    targetPlayersSwift.forEach(player => {
        if (!lastApplied[player.id] || now - lastApplied[player.id] >= 2000) { // Every 2 seconds
            try {
                player.addEffect("speed", toTicks(12), { amplifier: 0 }); // Speed (12s)
                lastApplied[player.id] = now;
            } catch (error) {
                console.warn(`Failed to apply speed to ${player.name}: ${error}`);
            }
        }
    })
}, 200); // Runs every 200ms

// compare two arrays
function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}







// Enderium Armor Effect: Call of the Void
const DRAGONS_BLESSING_COOLDOWN = 30 * 1000; // 30 seconds
const DRAGONS_BLESSING_THRESHOLD = 6; // In points, not hearts
const DRAGONS_BLESSING_DURATION = toTicks(5); // seconds of regeneration
const DRAGONS_BLESSING_LEVEL = 2; // Regeneration 3

let dragonsBlessingLastUsed = {};

// Get player health
function getPlayerHealth(player) {
    const healthComp = player.getComponent("health");
    if (!healthComp) return undefined;
    if (typeof healthComp.current === "number") return healthComp.current;
    if (typeof healthComp.value === "number") return healthComp.value;
    if (typeof healthComp.currentValue === "number") return healthComp.currentValue;
    if (typeof healthComp.health === "number") return healthComp.health;
    return undefined;
}

// Check for full set
function hasFullEnderiumSet(eq) {
    return (
        eq.getEquipment("Head")?.typeId === "wypnt_bab:enderium_helmet" &&
        eq.getEquipment("Chest")?.typeId === "wypnt_bab:enderium_chestplate" &&
        eq.getEquipment("Legs")?.typeId === "wypnt_bab:enderium_leggings" &&
        eq.getEquipment("Feet")?.typeId === "wypnt_bab:enderium_boots"
    );
}

system.runInterval(() => {
    const now = Date.now();
    for (const player of world.getAllPlayers()) {
        // If player is invalid, skip
        if (!player) continue;

        const eq = player.getComponent("equippable");
        if (!eq || !hasFullEnderiumSet(eq)) continue;

        const health = getPlayerHealth(player);
        if (typeof health !== "number") continue;

        // Only apply if health is at OR below threshold and cooldown expired
        if (
            health <= DRAGONS_BLESSING_THRESHOLD &&
            (!dragonsBlessingLastUsed[player.id] || now - dragonsBlessingLastUsed[player.id] > DRAGONS_BLESSING_COOLDOWN)
        ) {
            player.addEffect("regeneration", DRAGONS_BLESSING_DURATION, { amplifier: DRAGONS_BLESSING_LEVEL });
            player.runCommand(`playsound mob.enderdragon.growl @s ~~~ 0.05`);
            player.sendMessage("You feel a surge of energy from the void.");
            dragonsBlessingLastUsed[player.id] = now;
        }
    }
}, 10);
