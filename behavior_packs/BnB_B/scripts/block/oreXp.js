// Import necessary modules from Minecraft server API
import { world, system, EquipmentSlot } from '@minecraft/server';

const miningTiers = [
  void 0, // anyone // 0
  "minecraft:wooden_tier", // 1
  "minecraft:stone_tier", // 2
  "minecraft:copper_tier", // 3
  "minecraft:iron_tier", // 4
  "minecraft:diamond_tier", // 5
  "minecraft:netherite_tier" // 6
];

// Register a custom component before the world is loaded
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("wypnt_bab:spawn_ore_xp", {
        onPlayerBreak({ block, dimension, player }, { params: { min_tier }}) {
            // Check the tool in the player's hand
            const itemStack = player?.getComponent("minecraft:equippable")?.getEquipment(EquipmentSlot.Mainhand);
            if (!itemStack) return; // Exit if the player isn't holding any item
            
            const tiers = miningTiers.slice(min_tier);
            if (tiers[0] !== undefined && itemStack.hasTag("minecraft:is_pickaxe") && !tiers.some(tag => itemStack.hasTag(tag))) return;
            // Specify enchantments
            const enchantable = itemStack.getComponent("minecraft:enchantable");
            const silkTouch = enchantable?.getEnchantment("silk_touch");
            if (silkTouch) return; // Exit if the pickaxe has the Silk Touch enchantment

            // Spawn the XP orbs
            const xpAmount = ~~(Math.random() * (3 - 2 + 1)) + 2;

            for (let i = 0; i < xpAmount; i++) {
                dimension.spawnEntity("minecraft:xp_orb", block.location);
            }
        },
    });
});