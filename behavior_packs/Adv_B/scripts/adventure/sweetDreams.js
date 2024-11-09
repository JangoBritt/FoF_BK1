import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    if (player.isSleeping && !player.hasTag("SweetDreams")) {
      player.runCommandAsync('function adv/sweet_dreams/grant')
    }
  }
}, 5);



