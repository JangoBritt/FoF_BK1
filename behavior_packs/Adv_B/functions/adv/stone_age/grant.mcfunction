tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Stone Age]"}]}

tag @s add StoneAge

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add MinecraftCount dummy
scoreboard players add @s MinecraftCount 1