tag @s remove RemoteGateway

scoreboard objectives add AdvancementCount dummy
scoreboard players remove @s[scores={AdvancementCount=1..}] AdvancementCount 1

scoreboard objectives add EndCount dummy
scoreboard players remove @s[scores={EndCount=1..}] EndCount 1