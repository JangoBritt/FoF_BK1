import {
    world,
    system
} from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
  
  if (player.dimension.id === 'minecraft:nether' && !player.hasTag("EnterNether")) player.runCommandAsync('function adv/we_need_to_go_deeper/grant')
  
  }
}, 10);



