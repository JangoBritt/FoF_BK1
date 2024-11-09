tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Diamonds!]"}]}

tag @s add Diamonds

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add MinecraftCount dummy
scoreboard players add @s MinecraftCount 1