/execute as @a at @s if block ~ ~ ~ minecraft:grass_path run effect @e[r=1] speed 10 3 true
/execute as @e[type=pig] at @s if block ~ ~ ~ minecraft:grass_path run effect @s speed 10 30 true
/execute as @e[type=strider] at @s if block ~ ~ ~ minecraft:grass_path run effect @s speed 10 30 true


/execute as @a at @s if block ~ ~-2 ~ mr:rock_path_mr run effect @e[r=1] speed 10 3 true
/execute as @e[family=pig] at @s if block ~ ~-2 ~ mr:rock_path_mr run effect @s speed 10 30 true
/execute as @e[type=strider] at @s if block ~ ~-2 ~ mr:rock_path_mr run effect @s speed 10 30 true


/execute as @a at @s if block ~ ~ ~ mr:rock_path_mr run effect @e[r=1] speed 10 3 true
/execute as @e[family=pig] at @s if block ~ ~ ~ mr:rock_path_mr run effect @s speed 10 30 true
/execute as @e[type=strider] at @s if block ~ ~ ~ mr:rock_path_mr run effect @s speed 10 30 true
