execute as @e[type=fables_avatars:lifesupport,x=3869,y=97,z=-22960,c=1,r=1] at @s run tag @a[x=3839,dx=33,y=97,dy=5,z=-22964,dz=8] add HomeToMars
execute as @a[tag=HomeToMars] at @s run title @s title 5
execute as @a[tag=HomeToMars] at @s run title @s title 4
execute as @a[tag=HomeToMars] at @s run title @s title 3
execute as @a[tag=HomeToMars] at @s run effect @s blindness 10 50 true
execute as @a[tag=HomeToMars] at @s run title @s title 2
execute as @a[tag=HomeToMars] at @s run title @s title 1
execute as @a[tag=HomeToMars] at @s run playsound ambient.weather.thunder @s ~ ~ ~ 1 0.5
execute as @a[tag=HomeToMars] at @s run title @s clear
execute as @a[tag=HomeToMars] at @s run tp @s ~-3599 ~-19 ~21761
execute as @a[tag=HomeToMars] at @s run effect @s clear blindness
execute as @a[tag=HomeToMars] at @s run tag @s remove HomeToMars
