execute as @a[tag=!TwoBirds,scores={phantom_count=2..}] run function adv/two_birds_one_arrow/grant

scoreboard players remove @a[scores={unique_time=1..}] unique_time 1
scoreboard players set @a[scores={unique_time=0,phantom_count=1..}] phantom_count 0