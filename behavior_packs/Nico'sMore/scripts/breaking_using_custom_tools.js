import { world, BlockPermutation, GameMode } from "@minecraft/server";

world.afterEvents.playerBreakBlock.subscribe(eventData => {
  const player = eventData.player;
  const itemUsed = eventData.itemStackBeforeBreak;
  const brokenBlock = eventData.brokenBlockPermutation;
  const playerEquippable = player.getComponent("equippable");
  const instantDiggableBlocks = [
    "minecraft:acacia_sapling",
    "minecraft:allium",
    "minecraft:azalea",
    "minecraft:azure_bluet",
    "minecraft:beetroot",
    "minecraft:birch_sapling",
    "minecraft:blue_orchid",
    "minecraft:brain_coral",
    "minecraft:brain_coral_fan",
    "minecraft:brown_mushroom",
    "minecraft:bubble_coral",
    "minecraft:bubble_coral_fan",
    "minecraft:carrots",
    "minecraft:cave_vines",
    "minecraft:cave_vines_body_with_berries",
    "minecraft:cave_vines_head_with_berries",
    "minecraft:cherry_sapling",
    "minecraft:coral_fan_dead",
    "minecraft:coral_fan_hang",
    "minecraft:coral_fan_hang2",
    "minecraft:coral_fan_hang3",
    "minecraft:cornflower",
    "minecraft:crimson_fungus",
    "minecraft:crimson_roots",
    "minecraft:dark_oak_sapling",
    "minecraft:dead_brain_coral",
    "minecraft:dead_brain_coral_fan",
    "minecraft:dead_bubble_coral",
    "minecraft:dead_bubble_coral_fan",
    "minecraft:dead_fire_coral",
    "minecraft:dead_fire_coral_fan",
    "minecraft:dead_horn_coral",
    "minecraft:dead_horn_coral_fan",
    "minecraft:dead_tube_coral",
    "minecraft:dead_tube_coral_fan",
    "minecraft:deadbush",
    "minecraft:decorated_pot",
    "minecraft:double_plant", // old name
    "minecraft:end_rod",
    "minecraft:fern",
    "minecraft:fire",
    "minecraft:fire_coral",
    "minecraft:fire_coral_fan",
    "minecraft:flowering_azalea",
    "minecraft:flower_pot",
    "minecraft:frog_spawn",
    "minecraft:honey_block",
    "minecraft:hanging_roots",
    "minecraft:horn_coral",
    "minecraft:horn_coral_fan",
    "minecraft:jungle_sapling",
    "minecraft:kelp",
    "minecraft:lily_of_the_valley",
    "minecraft:mangrove_propagule",
    "minecraft:melon_stem",
    "minecraft:nether_sprouts",
    "minecraft:nether_wart",
    "minecraft:oak_sapling",
    "minecraft:orange_tulip",
    "minecraft:oxeye_daisy",
    "minecraft:pink_petals",
    "minecraft:pink_tulip",
    "minecraft:pitcher_plant",
    "minecraft:poppy",
    "minecraft:potatoes",
    "minecraft:powered_comparator",
    "minecraft:powered_repeater",
    "minecraft:pumpkin_stem",
    "minecraft:red_flower", // old name
    "minecraft:red_mushroom",
    "minecraft:red_tulip",
    "minecraft:redstone_torch",
    "minecraft:redstone_wire",
    "minecraft:reeds",
    "minecraft:sea_pickle",
    "minecraft:seagrass",
    "minecraft:short_grass",
    "minecraft:slime",
    "minecraft:soul_fire",
    "minecraft:soul_torch",
    "minecraft:spore_blossom",
    "minecraft:spruce_sapling",
    "minecraft:sweet_berry_bush",
    "minecraft:tallgrass", // old name
    "minecraft:tnt",
    "minecraft:torch",
    "minecraft:torchflower",
    "minecraft:tube_coral",
    "minecraft:tube_coral_fan",
    "minecraft:trip_wire",
    "minecraft:tripwire_hook",
    "minecraft:twisting_vines",
    "minecraft:unlit_redstone_torch",
    "minecraft:unpowered_comparator",
    "minecraft:unpowered_repeater",
    "minecraft:warped_fungus",
    "minecraft:warped_roots",
    "minecraft:waterlily",
    "minecraft:weeping_vines",
    "minecraft:wheat",
    "minecraft:white_tulip",
    "minecraft:wither_rose",
    "minecraft:yellow_flower",
    "minecraft:tall_grass",
    "minecraft:large_fern",
    "minecraft:sunflower",
    "minecraft:lilac",
    "minecraft:rose_bush",
    "minecraft:peony"
  ]
  const customWeapons = [
    "nicothekid:piglin_sledge_hammer"
  ]
  const customStaff = [
    "nicothekid:curserer_staff",
    "nicothekid:piglin_fire_staff"
  ]
  if (itemUsed === undefined || player.matches({ gameMode: GameMode.creative })) return;
  if (customWeapons.includes(itemUsed.typeId) || customStaff.includes(itemUsed.typeId)) {
    if (!instantDiggableBlocks.includes(brokenBlock.type.id) && !brokenBlock.hasTag("instant_diggable")) {
      if (customWeapons.includes(itemUsed.typeId)) {
        const itemEnchantable = itemUsed.getComponent("enchantable");
        const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        const randomizeChance = Math.random() * 100;
        if (breakChance < randomizeChance) return;
        const itemDurability = itemUsed.getComponent("durability");
        if (!itemDurability) return;
        const itemMaxDurability = itemDurability.maxDurability;
        const itemDurabilityDamage = itemDurability.damage;
        const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
        let damageAmount = 2;
        const currentDurability = durabilityCalculation - damageAmount;
        if (currentDurability <= 0) {
          player.playSound("random.break", { pitch: 0.9, location: player.location, volume: 1 });
          playerEquippable.setEquipment("Mainhand", null);
        }
        else {
          itemDurability.damage += damageAmount;
          playerEquippable.setEquipment("Mainhand", itemUsed)
        }
      }
      if (customStaff.includes(itemUsed.typeId)) {
        const itemEnchantable = itemUsed.getComponent("enchantable");
        const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
        const breakChance = 100 / (unbreakingLevel + 1);
        const randomizeChance = Math.random() * 100;
        if (breakChance < randomizeChance) return;
        const itemDurability = itemUsed.getComponent("durability");
        if (!itemDurability) return;
        const itemMaxDurability = itemDurability.maxDurability;
        const itemDurabilityDamage = itemDurability.damage;
        const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
        let damageAmount = 3;
        const currentDurability = durabilityCalculation - damageAmount;
        if (currentDurability <= 0) {
          player.playSound("random.break", { pitch: 0.9, location: player.location, volume: 1 });
          playerEquippable.setEquipment("Mainhand", null);
        }
        else {
          itemDurability.damage += damageAmount;
          playerEquippable.setEquipment("Mainhand", itemUsed)
        }
      }
    }
    else return;
  }
  else return;
});