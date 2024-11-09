import {
  world,
  system
} from "@minecraft/server";

//WHY SO MANY

const copperBlocks = [
  'minecraft:copper_block',
  'minecraft:exposed_copper',
  'minecraft:weathered_copper',
  'minecraft:oxidized_copper',
  'minecraft:chiseled_copper',
  'minecraft:exposed_chiseled_copper',
  'minecraft:weathered_chiseled_copper',
  'minecraft:oxidized_chiseled_copper',
  'minecraft:copper_bulb',
  'minecraft:exposed_copper_bulb',
  'minecraft:weathered_copper_bulb',
  'minecraft:oxidized_copper_bulb',
  'minecraft:copper_grate',
  'minecraft:exposed_copper_grate',
  'minecraft:weathered_copper_grate',
  'minecraft:oxidized_copper_grate',
  'minecraft:copper_bulb',
  'minecraft:exposed_copper_bulb',
  'minecraft:weathered_copper_bulb',
  'minecraft:oxidized_copper_bulb',
  'minecraft:cut_copper',
  'minecraft:exposed_cut_copper',
  'minecraft:weathered_cut_copper',
  'minecraft:oxidized_cut_copper',
  'minecraft:cut_copper_slab',
  'minecraft:exposed_cut_copper_slab',
  'minecraft:weathered_cut_copper_slab',
  'minecraft:oxidized_cut_copper_slab',
  'minecraft:double_cut_copper_slab',
  'minecraft:exposed_double_cut_copper_slab',
  'minecraft:weathered_double_cut_copper_slab',
  'minecraft:oxidized_double_cut_copper_slab',
  'minecraft:cut_copper_stairs',
  'minecraft:exposed_cut_copper_stairs',
  'minecraft:weathered_cut_copper_stairs',
  'minecraft:oxidized_cut_copper_stairs'
];

//Doors and Trapdoors only wax when player crouching

const sneakingCopperBlocks = [
  'minecraft:copper_block',
  'minecraft:exposed_copper',
  'minecraft:weathered_copper',
  'minecraft:oxidized_copper',
  'minecraft:chiseled_copper',
  'minecraft:exposed_chiseled_copper',
  'minecraft:weathered_chiseled_copper',
  'minecraft:oxidized_chiseled_copper',
  'minecraft:copper_bulb',
  'minecraft:exposed_copper_bulb',
  'minecraft:weathered_copper_bulb',
  'minecraft:oxidized_copper_bulb',
  'minecraft:copper_door',
  'minecraft:exposed_copper_door',
  'minecraft:weathered_copper_door',
  'minecraft:oxidized_copper_door',
  'minecraft:copper_grate',
  'minecraft:exposed_copper_grate',
  'minecraft:weathered_copper_grate',
  'minecraft:oxidized_copper_grate',
  'minecraft:copper_trapdoor',
  'minecraft:exposed_copper_trapdoor',
  'minecraft:weathered_copper_trapdoor',
  'minecraft:oxidized_copper_trapdoor',
  'minecraft:copper_bulb',
  'minecraft:exposed_copper_bulb',
  'minecraft:weathered_copper_bulb',
  'minecraft:oxidized_copper_bulb',
  'minecraft:cut_copper',
  'minecraft:exposed_cut_copper',
  'minecraft:weathered_cut_copper',
  'minecraft:oxidized_cut_copper',
  'minecraft:cut_copper_slab',
  'minecraft:exposed_cut_copper_slab',
  'minecraft:weathered_cut_copper_slab',
  'minecraft:oxidized_cut_copper_slab',
  'minecraft:double_cut_copper_slab',
  'minecraft:exposed_double_cut_copper_slab',
  'minecraft:weathered_double_cut_copper_slab',
  'minecraft:oxidized_double_cut_copper_slab',
  'minecraft:cut_copper_stairs',
  'minecraft:exposed_cut_copper_stairs',
  'minecraft:weathered_cut_copper_stairs',
  'minecraft:oxidized_cut_copper_stairs'
];


const sneakingWaxedBlocks = [
  'minecraft:waxed_copper_block',
  'minecraft:waxed_exposed_copper',
  'minecraft:waxed_weathered_copper',
  'minecraft:waxed_oxidized_copper',
  'minecraft:waxed_chiseled_copper',
  'minecraft:waxed_exposed_chiseled_copper',
  'minecraft:waxed_weathered_chiseled_copper',
  'minecraft:waxed_oxidized_chiseled_copper',
  'minecraft:waxed_copper_bulb',
  'minecraft:waxed_exposed_copper_bulb',
  'minecraft:waxed_weathered_copper_bulb',
  'minecraft:waxed_oxidized_copper_bulb',
  'minecraft:waxed_copper_door',
  'minecraft:waxed_exposed_copper_door',
  'minecraft:waxed_weathered_copper_door',
  'minecraft:waxed_oxidized_copper_door',
  'minecraft:waxed_copper_grate',
  'minecraft:waxed_exposed_copper_grate',
  'minecraft:waxed_weathered_copper_grate',
  'minecraft:waxed_oxidized_copper_grate',
  'minecraft:waxed_copper_trapdoor',
  'minecraft:waxed_exposed_copper_trapdoor',
  'minecraft:waxed_weathered_copper_trapdoor',
  'minecraft:waxed_oxidized_copper_trapdoor',
  'minecraft:waxed_copper_bulb',
  'minecraft:waxed_exposed_copper_bulb',
  'minecraft:waxed_weathered_copper_bulb',
  'minecraft:waxed_oxidized_copper_bulb',
  'minecraft:waxed_cut_copper',
  'minecraft:waxed_exposed_cut_copper',
  'minecraft:waxed_weathered_cut_copper',
  'minecraft:waxed_oxidized_cut_copper',
  'minecraft:waxed_cut_copper_slab',
  'minecraft:waxed_exposed_cut_copper_slab',
  'minecraft:waxed_weathered_cut_copper_slab',
  'minecraft:waxed_oxidized_cut_copper_slab',
  'minecraft:waxed_double_cut_copper_slab',
  'minecraft:waxed_exposed_double_cut_copper_slab',
  'minecraft:waxed_weathered_double_cut_copper_slab',
  'minecraft:waxed_oxidized_double_cut_copper_slab',
  'minecraft:waxed_cut_copper_stairs',
  'minecraft:waxed_exposed_cut_copper_stairs',
  'minecraft:waxed_weathered_cut_copper_stairs',
  'minecraft:waxed_oxidized_cut_copper_stairs'
];

const waxedBlocks = [
  'minecraft:waxed_copper_block',
  'minecraft:waxed_exposed_copper',
  'minecraft:waxed_weathered_copper',
  'minecraft:waxed_oxidized_copper',
  'minecraft:waxed_chiseled_copper',
  'minecraft:waxed_exposed_chiseled_copper',
  'minecraft:waxed_weathered_chiseled_copper',
  'minecraft:waxed_oxidized_chiseled_copper',
  'minecraft:waxed_copper_bulb',
  'minecraft:waxed_exposed_copper_bulb',
  'minecraft:waxed_weathered_copper_bulb',
  'minecraft:waxed_oxidized_copper_bulb',
  'minecraft:waxed_copper_grate',
  'minecraft:waxed_exposed_copper_grate',
  'minecraft:waxed_weathered_copper_grate',
  'minecraft:waxed_oxidized_copper_grate',
  'minecraft:waxed_copper_bulb',
  'minecraft:waxed_exposed_copper_bulb',
  'minecraft:waxed_weathered_copper_bulb',
  'minecraft:waxed_oxidized_copper_bulb',
  'minecraft:waxed_cut_copper',
  'minecraft:waxed_exposed_cut_copper',
  'minecraft:waxed_weathered_cut_copper',
  'minecraft:waxed_oxidized_cut_copper',
  'minecraft:waxed_cut_copper_slab',
  'minecraft:waxed_exposed_cut_copper_slab',
  'minecraft:waxed_weathered_cut_copper_slab',
  'minecraft:waxed_oxidized_cut_copper_slab',
  'minecraft:waxed_double_cut_copper_slab',
  'minecraft:waxed_exposed_double_cut_copper_slab',
  'minecraft:waxed_weathered_double_cut_copper_slab',
  'minecraft:waxed_oxidized_double_cut_copper_slab',
  'minecraft:waxed_cut_copper_stairs',
  'minecraft:waxed_exposed_cut_copper_stairs',
  'minecraft:waxed_weathered_cut_copper_stairs',
  'minecraft:waxed_oxidized_cut_copper_stairs'
];

world.beforeEvents.itemUseOn.subscribe((event) => {
  const item = event.itemStack;
  const player = event.source;
  const block = event.block

  if (!item || !player || !block) {
    return;
  }


  if (item.typeId === 'minecraft:honeycomb' && ((player.isSneaking && sneakingCopperBlocks.includes(block.typeId)) || (!player.isSneaking && copperBlocks.includes(block.typeId))) && !player.hasTag('WaxOn')) player.runCommandAsync('function adv/wax_on/grant')

  if (item.hasTag('minecraft:is_axe') && ((player.isSneaking && sneakingWaxedBlocks.includes(block.typeId)) || (!player.isSneaking && waxedBlocks.includes(block.typeId))) && !player.hasTag('WaxOff')) player.runCommandAsync('function adv/wax_off/grant')
})