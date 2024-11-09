import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const pHeight = player.location.y;
    if (pHeight >= 319 && !player.hasTag("CavesCliffs") && !player.hasTag('TopOfWorld')) {
      player.addTag('TopOfWorld')
    }

    if (pHeight < -59 && !player.hasTag("CavesCliffs") && player.hasTag('TopOfWorld')) {
      player.runCommandAsync('function adv/caves_and_cliffs/grant')
      player.removeTag('TopOfWorld')
    }

    if (pHeight >= -59 && player.isOnGround && !player.hasTag("CavesCliffs") && player.hasTag('TopOfWorld')) {
      player.removeTag('TopOfWorld')
    }
  }
}, 1);



