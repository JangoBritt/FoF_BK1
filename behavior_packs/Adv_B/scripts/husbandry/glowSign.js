import {
  world,
  system
} from "@minecraft/server";

const signBlocks = [
  'minecraft:standing_sign',
  'minecraft:spruce_standing_sign',
  'minecraft:birch_standing_sign',
  'minecraft:jungle_standing_sign',
  'minecraft:darkoak_standing_sign',
  'minecraft:acacia_standing_sign',
  'minecraft:crimson_standing_sign',
  'minecraft:warped_standing_sign',
  'minecraft:mangrove_standing_sign',
  'minecraft:cherry_standing_sign',
  'minecraft:bamboo_standing_sign',
  'minecraft:wall_sign',
  'minecraft:spruce_wall_sign',
  'minecraft:birch_wall_sign',
  'minecraft:jungle_wall_sign',
  'minecraft:darkoak_wall_sign',
  'minecraft:acacia_wall_sign',
  'minecraft:crimson_wall_sign',
  'minecraft:warped_wall_sign',
  'minecraft:mangrove_wall_sign',
  'minecraft:cherry_wall_sign',
  'minecraft:bamboo_wall_sign',
  'minecraft:oak_hanging_sign',
  'minecraft:spruce_hanging_sign',
  'minecraft:birch_hanging_sign',
  'minecraft:jungle_hanging_sign',
  'minecraft:darkoak_hanging_sign',
  'minecraft:acacia_hanging_sign',
  'minecraft:crimson_hanging_sign',
  'minecraft:warped_hanging_sign',
  'minecraft:mangrove_hanging_sign',
  'minecraft:cherry_hanging_sign',
  'minecraft:bamboo_hanging_sign'
];

world.beforeEvents.itemUseOn.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;
  const block = event.block

  if (!item || !player || !block) {
    return;
  }


  if (item.typeId === 'minecraft:glow_ink_sac' && signBlocks.includes(block.typeId) && !player.hasTag('GlowBehold')) player.runCommandAsync('function adv/glow_and_behold/grant')
})