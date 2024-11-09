tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[A Balanced Diet]"}]}

tag @s add BalancedDiet

xp 100

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add HusbandryCount dummy
scoreboard players add @s HusbandryCount 1