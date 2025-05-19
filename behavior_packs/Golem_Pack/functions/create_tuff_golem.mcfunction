execute as @e[type=item,name="tuff"] at @s if block ~~~ red_carpet if block ~~-1~ tuff run summon fables_golem:tuff_golem ~~~
execute as @e[type=item,name="tuff"] at @s if block ~~~ red_carpet if block ~~-1~ tuff run tag @s add despawn
execute as @e[type=item,name="tuff"] at @s if block ~~~ red_carpet if block ~~-1~ tuff run fill ~~~ ~~-1~ air
kill @e[type=item,tag=despawn]