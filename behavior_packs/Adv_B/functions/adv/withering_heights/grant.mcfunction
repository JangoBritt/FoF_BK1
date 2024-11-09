tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Withering Heights]"}]}

tag @s add WitheringHeights

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add NetherCount dummy
scoreboard players add @s NetherCount 1