tag @s remove SweetDreams

scoreboard objectives add AdvancementCount dummy
scoreboard players remove @s[scores={AdvancementCount=1..}] AdvancementCount 1

scoreboard objectives add AdventureCount dummy
scoreboard players remove @s[scores={AdventureCount=1..}] AdventureCount 1