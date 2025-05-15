execute as @e[type=item,name="copper ingot"] at @s if block ~~~ lightning_rod if block ~~-1~ copper_block run summon fables_golem:copper_golem ~ ~ ~ ~ ~ minecraft:entity_spawned
execute as @e[type=item,name="copper ingot"] at @s if block ~~~ lightning_rod if block ~~-1~ copper_block run tag @s add despawn
execute as @e[type=item,name="copper ingot"] at @s if block ~~~ lightning_rod if block ~~-1~ copper_block run fill ~~~ ~~-1~ air
kill @e[type=item,tag=despawn]