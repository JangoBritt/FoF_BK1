import { world, system } from "@minecraft/server";

let targetPlayers = [];
let swiftPlayers = [];

// Interval for checking armor
system.runInterval(() => {
    targetPlayers = [];
    swiftPlayers = [];
    let players = world.getAllPlayers();
    players.forEach(player => {
        const equippable = player.getComponent("equippable");
        const headArmor = equippable.getEquipment("Head");
        const chestArmor = equippable.getEquipment("Chest");
        const legArmor = equippable.getEquipment("Legs");
        const footArmor = equippable.getEquipment("Feet");

        // Check if the player is wearing the full set of vibranium armor
        if (headArmor?.typeId == "korbon:vibranium_helmet" &&
            chestArmor?.typeId == "korbon:vibranium_chestplate" &&
            legArmor?.typeId == "korbon:vibranium_leggings" &&
            footArmor?.typeId == "korbon:vibranium_boots") {
            targetPlayers.push(player);
        }

        // Check if the player is wearing the swiftrunner boots
        if (footArmor?.typeId == "korbon:swiftrunner_boots") {
            swiftPlayers.push(player);
        }
    });
}, 200);

// Track when we last applied the effects
let lastApplied = {};

system.runInterval(() => {
    const now = Date.now();
    targetPlayers.forEach(player => {
        // If we haven't applied the effect in the last 15 seconds (300 ticks), apply it
        if (!lastApplied[player.id] || now - lastApplied[player.id] > 15000) {
            player.addEffect('absorption', 320, { amplifier: 0, showParticles: false });
            lastApplied[player.id] = now;
        }
    });

    swiftPlayers.forEach(player => {
        // If we haven't applied the effect in the last 15 seconds (300 ticks), apply it
        if (!lastApplied[player.id] || now - lastApplied[player.id] > 8000) {
            player.addEffect('speed', 320, { amplifier: 1, showParticles: false });
            lastApplied[player.id] = now;
        }
    });
}, 200);
