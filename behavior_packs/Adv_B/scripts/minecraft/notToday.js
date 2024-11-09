import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {

const mainItem = player.getComponent("minecraft:equippable").getEquipment("Mainhand");

  if (mainItem && mainItem.typeId === 'minecraft:shield' && player.isSneaking && !player.hasTag("NotToday")) {
      player.runCommandAsync('function adv/not_today_thank_you/grant')
      return;
    }
const offItem = player.getComponent("minecraft:equippable").getEquipment("Offhand");

  if (offItem && offItem.typeId === 'minecraft:shield' && player.isSneaking && !player.hasTag("NotToday")) {
      player.runCommandAsync('function adv/not_today_thank_you/grant')
    }

  }
}, 3);



