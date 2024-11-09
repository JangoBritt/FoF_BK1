tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Free The End]"}]}

tag @s add FreeEnd

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add EndCount dummy
scoreboard players add @s EndCount 1