tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Ice Bucket Challenge]"}]}

tag @s add IceBucket

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add MinecraftCount dummy
scoreboard players add @s MinecraftCount 1