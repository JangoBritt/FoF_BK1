tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has completed the challenge §5[Hot Tourist Destinations]"}]}

tag @s add HotTourist

xp 500

playsound ui.challenge_complete @s 

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add NetherCount dummy
scoreboard players add @s NetherCount 1