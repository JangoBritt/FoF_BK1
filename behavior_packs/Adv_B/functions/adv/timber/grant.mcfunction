tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Timber!!!]"}]}

tag @s add Timber

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AchievementCount dummy
scoreboard players add @s AchievementCount 1