tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Hidden in the Depths]"}]}

tag @s add HiddenDepths

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add NetherCount dummy
scoreboard players add @s NetherCount 1