import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {

  if (player.dimension.id === 'minecraft:the_end' && !player.hasTag("TheEnd")) player.runCommandAsync('function adv/the_end/grant')
  }
}, 5);



