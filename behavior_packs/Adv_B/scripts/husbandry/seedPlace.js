import {
  world,
  system
} from "@minecraft/server";

const seedyPlace = [
  'minecraft:wheat',
  'minecraft:pumpkin_stem',
  'minecraft:melon_stem',
  'minecraft:beetroot',
  'minecraft:nether_wart',
  'minecraft:torchflower_crop',
  'minecraft:pitcher_crop'
];

const plantingPast = [
  'minecraft:torchflower_crop',
  'minecraft:pitcher_crop'
];


world.afterEvents.playerPlaceBlock.subscribe((event) => {
  const block = event.block;
  const player = event.player;

  if (!block || !player) {
    return;
  }

  if (seedyPlace.includes(block.typeId) && !player.hasTag('SeedyPlace')) player.runCommandAsync('function adv/a_seedy_place/grant')

  if (plantingPast.includes(block.typeId) && !player.hasTag('PlantingPast')) player.runCommandAsync('function adv/planting_the_past/grant')
})

