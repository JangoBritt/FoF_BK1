tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[Serious Dedication]"}]}

tag @s add SeriousDedication

xp 100

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add HusbandryCount dummy
scoreboard players add @s HusbandryCount 1