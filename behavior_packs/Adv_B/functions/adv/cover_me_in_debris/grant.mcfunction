tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[Cover Me in Debris]"}]}

tag @s add CoverDebris

xp 100

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add NetherCount dummy
scoreboard players add @s NetherCount 1