import {
    world,
    system,
    EntityInitializationCause 
} from "@minecraft/server";

world.afterEvents.entitySpawn.subscribe((event) => {
    const cause = event.cause;
    const entity = event.entity;

  if (entity.typeId === 'minecraft:iron_golem' && cause == EntityInitializationCause.Event) entity.runCommandAsync('execute as @p[r=8] run execute as @s[tag=!HiredHelp] run function adv/hired_help/grant')

  if (entity.typeId === 'minecraft:warden' && cause == EntityInitializationCause.Event) entity.runCommandAsync('execute as @a[r=12,tag=!RunLife] at @s run function adv/run_for_your_life/grant')

  if (entity.typeId === 'minecraft:wither') entity.runCommandAsync('execute as @a[r=64,tag=!WitheringHeights] at @s run function adv/withering_heights/grant')

  if (entity.typeId === 'minecraft:ender_dragon') entity.runCommandAsync('execute as @a[r=192] run execute as @s[tag=!EndAgain,tag=FreeEnd] run function adv/the_end_again/grant')

  if (entity.typeId === 'minecraft:witch' && cause == EntityInitializationCause.Transformed) entity.runCommandAsync('execute as @a[r=8] run execute as @s[tag=!VeryFrightening] run function adv/very_very_frightening/grant')

  if (entity.typeId === 'minecraft:villager_v2' && cause == EntityInitializationCause.Transformed) entity.runCommandAsync('execute as @a[r=32] run execute as @s[tag=!ZombieDoctor] run function adv/zombie_doctor/grant')

if (entity.typeId === 'minecraft:eye_of_ender_signal') entity.runCommandAsync('execute as @p[r=4,tag=!EyeSpy] at @s run function adv/eye_spy/grant')

})
