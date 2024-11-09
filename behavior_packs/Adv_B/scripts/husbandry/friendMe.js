import {
  world,
  system
} from "@minecraft/server";

world.afterEvents.playerInteractWithEntity.subscribe((event) => {
  const entity = event.target;
  const player = event.player;

  if (!entity || !player) {
    return;
  }
  if (player.isSneaking || entity.typeId !== 'minecraft:allay') {return;}

  if (!player.hasTag('FriendMe')) player.runCommandAsync('function adv/youve_got_a_friend_in_me/grant')
})

