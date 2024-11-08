import { world, system } from "@minecraft/server";

let targetPlayers = []
system.runInterval(() => {
    targetPlayers = []
    let players = world.getAllPlayers();
    players.forEach(player => {
        const equippable = player.getComponent("equippable");
        const headArmor = equippable.getEquipment("Head");
        const chestArmor = equippable.getEquipment("Chest");
        const legArmor = equippable.getEquipment("Legs");
        const footArmor = equippable.getEquipment("Feet");

        // Check if the player is wearing the full set of armor
        if (headArmor?.typeId == "korbon:vibranium_helmet" &&
            chestArmor?.typeId == "korbon:vibranium_chestplate" &&
            legArmor?.typeId == "korbon:vibranium_leggings" &&
            footArmor?.typeId == "korbon:vibranium_boots") {
          targetPlayers.push(player)
        }
    })
},200);

// Track when we last applied the effect
let lastApplied = {}

system.runInterval(() => {
    targetPlayers.forEach(player => {
        const now = Date.now();
        // If we haven't applied the effect in the last 11 seconds (220 ticks), apply it
        if (!lastApplied[player.id] || now - lastApplied[player.id] > 15000) {
            player.addEffect('absorption', 320, { amplifier: 0, showParticles: false });
            lastApplied[player.id] = now;
        }
    })
});
