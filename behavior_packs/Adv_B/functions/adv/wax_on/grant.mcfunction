tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[Wax On]"}]}

tag @s add WaxOn

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add HusbandryCount dummy
scoreboard players add @s HusbandryCount 1