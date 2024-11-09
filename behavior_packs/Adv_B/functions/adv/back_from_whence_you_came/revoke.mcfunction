tag @s remove BackCame

scoreboard objectives add AdvancementCount dummy
scoreboard players remove @s[scores={AdvancementCount=1..}] AdvancementCount 1

scoreboard objectives add AchievementCount dummy
scoreboard players remove @s[scores={AchievementCount=1..}] AchievementCount 1