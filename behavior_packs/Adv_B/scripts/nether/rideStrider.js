import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const riding = player.getComponent('minecraft:riding')
    if(riding) {
    const mount = riding.entityRidingOn
    if (!player.hasTag('BoatLegs') && mount.typeId === "minecraft:strider") {
      player.runCommandAsync('function adv/this_boat_has_legs/grant')
    }

    if (player.dimension.id === 'minecraft:overworld' && !player.hasTag('LikeHome') && mount.typeId === "minecraft:strider") {
      player.runCommandAsync('function adv/feels_like_home/grant')
    }
}
  }
});