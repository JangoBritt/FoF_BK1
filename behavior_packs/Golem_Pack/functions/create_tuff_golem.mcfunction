execute as @e[type=item,name="tuff"] as @s if block ~~~ carpet if block ~~-1~ tuff -1 run summon fables_golem:tuff_golem ~~-1~
execute as @e[type=item,name="tuff"] as @s if block ~~~ carpet if block ~~-1~ tuff -1 run tag @s add despawn
execute as @e[type=item,name="tuff"] as @s if block ~~~ carpet if block ~~-1~ tuff -1 run fill ~~~ ~~-1~ air 0
kill @e[type=item,tag=despawn]