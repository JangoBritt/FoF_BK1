tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Light as a Rabbit]"}]}

tag @s add LightRabbit

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AdventureCount dummy
scoreboard players add @s AdventureCount 1