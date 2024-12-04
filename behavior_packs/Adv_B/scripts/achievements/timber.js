import {
  world,
  system
} from "@minecraft/server";


world.afterEvents.playerBreakBlock.subscribe((event) => {
  const block = event.block;
  const player = event.player;
  const permutation = event.brokenBlockPermutation;

  if (!block || !player) {
    return;
  }
  if(permutation.type.id !== 'minecraft:creaking_heart') return;
  if(permutation.getState("natural") !== true) return;

  if(!player.hasTag('Timber')) player.runCommandAsync('function adv/timber/grant')
})