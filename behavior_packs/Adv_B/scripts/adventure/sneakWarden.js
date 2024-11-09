import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    if (player.isSneaking && !player.hasTag("Sneak100")) {
      player.runCommandAsync('function adv/sneak_100/test')
    }
  }
}, 20);



