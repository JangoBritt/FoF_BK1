import './block/petalFlower'
import './block/flowerSpread'
import './block/customSapling'
import './block/doublePlant'
import './block/strippedWood'
import './block/vineTwisted'
import './block/stepOn'
import './block/taxiCabLeafFunction'
import './block/fencePlace'
import './block/fenceGate'
import './block/doorFunction'
import './block/trapdoorFunction'
import './block/slabFunction'
import './block/vineFunction'
import './block/quickSand'
import './block/topWaterBlocks'
import './block/blockShear'
import './block/fireflyJar'
import './block/oreXp'
import './block/whisperingWillow'
import './block/customCrop'
import './block/standingTorch'
import './block/crocodileEgg'
import './block/VolcanicStone'
import './block/bananaBlock'
import './block/lanternPlace'

import 'index'
import 'ambientEffects'
import 'settingsForm'
import 'stealChest'
import 'armorEffects'
import 'weaponEffects'
import 'endBiomeFunctions'
import 'toolFunctions'











import { ItemStack, GameMode, EquipmentSlot, BlockPermutation, world, system } from '@minecraft/server';

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player;
    if (!event.initialSpawn) return;
    
    const VERSION = "0.9.0";

    const versionRegistered = player.getDynamicProperty("[wypnt_bab]_version");
    
    if (versionRegistered === VERSION) return;
    if (versionRegistered === undefined)
    player.setDynamicProperty("[wypnt_bab]_version", VERSION);
   if(versionRegistered < VERSION) {

    player.sendMessage({ translate: "welcome.wypnt_bab:update.text", with: [versionRegistered, VERSION] });
    player.setDynamicProperty("[wypnt_bab]_version", VERSION);
   } else {
            // downgrade detected
            player.sendMessage({
                translate: "welcome.wypnt_bab:downgrade_warn.text",
                with: [versionRegistered, VERSION]
            });
        }

    // Only the first time the player spawns
    if (event.initialSpawn) {
        // Checks if the player already has the joined tag
        if (!player.hasTag("wypnt_bab:joined")) {
            // Send message
            player.sendMessage({ translate: "welcome.wypnt_bab:first_join.text" });

            // Give the items
            const inventory = player.getComponent("minecraft:inventory")?.container;
            if (inventory) {
                inventory.addItem(new ItemStack("wypnt_bab:personal_settings", 1));
                inventory.addItem(new ItemStack("wypnt_bab:info_book", 1));
            }

            // Mark the player with the joined tag so it doesn't happen again
            player.addTag("wypnt_bab:joined");
        }
    }
});

// Script used to update blocks with old ids to new ones 
system.beforeEvents.startup.subscribe(startup => {
    startup.blockComponentRegistry.registerCustomComponent("wypnt_bab:block_updater", {
        "onTick": ({ block }, { params }) => {
            const newBlock = params.transform_into;
            const keep_permutation = params.keep_permutation ?? false;
            const change_permutation = params.change_permutation ?? false;

            system.run(() => {
                const currentStates = block.permutation.getAllStates();
                const states = {};
            if (keep_permutation || change_permutation) {
                    for (const [key, value] of Object.entries(currentStates)) {
                        states[key] = value;
                    }
                }
            if (change_permutation) {
                for (const [key, value] of Object.entries(change_permutation)) {
                    states[key] = value;
                }
            };
            const permutation = BlockPermutation.resolve(newBlock, states);
            block.setPermutation(permutation);
        });
        }
    });
    startup.blockComponentRegistry.registerCustomComponent("wypnt_bab:mining_require_item", {
        onPlayerBreak: ({ block, brokenBlockPermutation, player }, { params: { tag }}) => {
        	if (player.getGameMode() === "Creative") return;
            if (player.getComponent("equippable").getEquipment("Mainhand").hasTag(tag)) {
                block.dimension.runCommand(`loot spawn ${block.x} ${block.y} ${block.z} loot "blocks/${brokenBlockPermutation.type.id.split(":")[1]}"`);
            }
        }
    })
});

// -Tool Durability- //

// Component to make the sword lose 1 durability and not 2 when attacking a mob 
system.beforeEvents.startup.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('wypnt_bab:is_sword', {
    onBeforeDurabilityDamage: initEvent => initEvent.durabilityDamage += -1
  });
})

// Arrays for tools and armor items that will lose durability.
const toolTypeIds = new Set([
    "wypnt_bab:tungsten_sword",
    "wypnt_bab:tungsten_pickaxe",
    "wypnt_bab:tungsten_axe",
    "wypnt_bab:tungsten_shovel",
    "wypnt_bab:tungsten_hoe",
    "wypnt_bab:enderium_sword",
    "wypnt_bab:enderium_pickaxe",
    "wypnt_bab:enderium_axe",
    "wypnt_bab:enderium_shovel",
    "wypnt_bab:enderium_hoe",
    "wypnt_bab:gold_khopesh"
]);
// List of swords that lose 2 durability when breaking a block 
const weaponTypeIds = new Set([
    "wypnt_bab:tungsten_sword",
    "wypnt_bab:enderium_sword",
    "wypnt_bab:gold_khopesh"
]);
const blockTags = new Set([
    'minecraft:is_pickaxe_item_destructible',
    'stone','metal','wood_pick_diggable',
    'stone_pick_diggable','iron_pick_diggable','diamond_pick_diggable',
    'minecraft:stone_tier_destructible',
    'minecraft:iron_tier_destructible',
    'minecraft:diamond_tier_destructible',
    'minecraft:netherite_tier_destructible',
    'minecraft:is_axe_item_destructible',
    'wood','log','trapdoors','pumpkin','text_sign',
    'minecraft:is_shovel_item_destructible','dirt','gravel','grass','sand',
    'minecraft:is_hoe_item_destructible','leaves',
    'minecraft:is_sword_item_destructible'
])

// Helper to get Unbreaking level from an item
function shouldLoseDurability(item) {
    const enchComp = item.getComponent("minecraft:enchantable");
    const unbreak = enchComp?.getEnchantment("unbreaking");
    if (!unbreak) return true;
    return Math.random() < (1 / (unbreak.level + 1));
};

const matchTag = (blockPerm) => blockPerm.getTags().some(tag => blockTags.has(tag));

// Handle tool durability on block break
world.afterEvents.playerBreakBlock.subscribe(evd => {
    const { player, itemStackBeforeBreak: itemUsed, brokenBlockPermutation: block } = evd;
    if (!matchTag(block) || !itemUsed || !toolTypeIds.has(itemUsed?.typeId) || player.matches({ gameMode: GameMode.Creative })) return;

        const playerEquippableComp = player.getComponent("equippable");
        const itemUsedDurabilityComp = itemUsed.getComponent("durability");
        if (!playerEquippableComp || !itemUsedDurabilityComp) return;
        if (!shouldLoseDurability(itemUsed)) return;

        itemUsedDurabilityComp.damage += weaponTypeIds.has(itemUsed.typeId) ? 2 : 1;
        const maxDurability = itemUsedDurabilityComp.maxDurability;
        const currentDamage = itemUsedDurabilityComp.damage;
        if (currentDamage >= maxDurability) {
            player.dimension.playSound('random.break', player.location, {
                pitch: 1.0, volume: 1.0
            });
            itemUsed = undefined;
        };
        //take the item out of your hand or just change the durability
        playerEquippableComp.setEquipment(EquipmentSlot.Mainhand, itemUsed);
});
