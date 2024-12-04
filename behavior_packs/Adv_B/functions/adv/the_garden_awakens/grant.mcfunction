tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has reached the goal §a[The Garden Awakens..]"}]}

tag @s add GardenAwakens

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AchievementCount dummy
scoreboard players add @s AchievementCount 1