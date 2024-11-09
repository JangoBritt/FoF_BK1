tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has reached the goal §a[Revaulting]"}]}

tag @s add Revaulting

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AdventureCount dummy
scoreboard players add @s AdventureCount 1