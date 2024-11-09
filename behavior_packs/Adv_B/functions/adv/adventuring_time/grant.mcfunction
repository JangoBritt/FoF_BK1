tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[Adventuring Time]"}]}

tag @s add AdventuringTime

xp 500

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AdventureCount dummy
scoreboard players add @s AdventureCount 1