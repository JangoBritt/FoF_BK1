execute as @e[type=backpack:entity_container] as @p[r=4,c=1] run tag @e[r=4,c=1,type=backpack:entity_container] add active
event entity @e[type=backpack:entity_container,tag=!active] despawn2
tag @e[type=backpack:entity_container] remove active