tag @s remove PowersCombined

scoreboard objectives add AdvancementCount dummy
scoreboard players remove @s[scores={AdvancementCount=1..}] AdvancementCount 1

scoreboard objectives add HusbandryCount dummy
scoreboard players remove @s[scores={HusbandryCount=1..}] HusbandryCount 1