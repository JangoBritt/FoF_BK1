tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[I Speak for the Trees]"}]}

tag @s add SpeakTrees

xp 50

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1


scoreboard objectives add AchievementCount dummy
scoreboard players add @s AchievementCount 1