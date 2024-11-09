tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[Smithing with Style]"}]}

tag @s add SmithingStyle

xp 100

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AdventureCount dummy
scoreboard players add @s AdventureCount 1