import { world, ItemStack, GameMode } from '@minecraft/server';

// This array defines the vanilla items that will lose durability when mining an addon block.
const vanillaToolIds = [
    'minecraft:wooden_sword',
    'minecraft:wooden_shovel',
    'minecraft:wooden_pickaxe',
    'minecraft:wooden_axe',
    'minecraft:wooden_hoe',
    'minecraft:stone_sword',
    'minecraft:stone_shovel',
    'minecraft:stone_pickaxe',
    'minecraft:stone_axe',
    'minecraft:stone_hoe',
    'minecraft:iron_sword',
    'minecraft:iron_shovel',
    'minecraft:iron_pickaxe',
    'minecraft:iron_axe',
    'minecraft:iron_hoe',
    'minecraft:golden_sword',
    'minecraft:golden_shovel',
    'minecraft:golden_pickaxe',
    'minecraft:golden_axe',
    'minecraft:golden_hoe',
    'minecraft:diamond_sword',
    'minecraft:diamond_shovel',
    'minecraft:diamond_pickaxe',
    'minecraft:diamond_axe',
    'minecraft:diamond_hoe',
    'minecraft:netherite_sword',
    'minecraft:netherite_shovel',
    'minecraft:netherite_pickaxe',
    'minecraft:netherite_axe',
    'minecraft:netherite_hoe'
];

world.afterEvents.playerBreakBlock.subscribe(evd => {
    const { player, brokenBlockPermutation: block, itemStackBeforeBreak: itemUsed } = evd;

    // This returns if itemUsed is undefined or if the player is in Creative.
    if (!itemUsed || player.matches({ gameMode: GameMode.creative })) return;

    // Checks if the blocks being mined were added by the addon.
    if (block.hasTag('k_custom_mining_speed')) {
        if (vanillaToolIds.includes(itemUsed.typeId)) {

            // This retrieves the player's equippable component.
            const playerEquippableComp = player.getComponent("equippable");

            // This returns if playerEquippableComp is undefined.
            if (!playerEquippableComp) return;

            // This retrieves the enchantable component of the item.
            const itemEnchantmentComp = itemUsed.getComponent("minecraft:enchantable");
            const unbreakingLevel = itemEnchantmentComp?.getEnchantment("unbreaking")?.level ?? 0;

            // Calculates the chance of an item breaking based on its unbreaking level. This is the vanilla unbreaking formula.
            const breakChance = 100 / (unbreakingLevel + 1);
            // Generates a random chance value between 0 and 100.
            const randomizeChance = Math.random() * 100;

            // This returns if breakChance is less than randomizeChance.
            if (breakChance < randomizeChance) return;

            // This retrieves the durability component of the item.
            const itemUsedDurabilityComp = itemUsed.getComponent("durability");

            // This returns if itemUsedDurabilityComp is undefined.
            if (!itemUsedDurabilityComp) return;

            // This will set the new durability value.
            if (itemUsedDurabilityComp.damage < itemUsedDurabilityComp.maxDurability) {
                itemUsedDurabilityComp.damage += 1;
            }

            // Declares and checks if the item is out of durability
            const maxDurability = itemUsedDurabilityComp.maxDurability
            const currentDamage = itemUsedDurabilityComp.damage
            if (currentDamage >= maxDurability) {

                // If the item is out of durability, plays the item breaking sound and removes the item
                player.playSound('random.break', { pitch: 1, location: player.location, volume: 1 })
                playerEquippableComp.setEquipment("Mainhand", new ItemStack('minecraft:air', 1));
            }
            else if (currentDamage < maxDurability) {
    
                // This sets the item in the player's selected slot.
                playerEquippableComp.setEquipment("Mainhand", itemUsed);
            }
        }
    }
})
