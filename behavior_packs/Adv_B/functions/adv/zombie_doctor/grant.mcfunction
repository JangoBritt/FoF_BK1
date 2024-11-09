tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has reached the goal §a[Zombie Doctor]"}]}

tag @s add ZombieDoctor
tag @s remove BeganCure

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add MinecraftCount dummy
scoreboard players add @s MinecraftCount 1