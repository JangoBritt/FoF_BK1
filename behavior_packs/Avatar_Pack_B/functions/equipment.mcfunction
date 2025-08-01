execute as @a[hasitem={item=fables_avatars:bunny_mask_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fables_avatars:big_bunny_ears_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fables_avatars:bunny_ears_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fmh:rabbit_coat_black_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fmh:rabbit_coat_brown_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fmh:rabbit_coat_desert_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fmh:rabbit_coat_salt_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fmh:rabbit_coat_splotched_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fmh:rabbit_coat_white_mask,location=slot.armor.head}] at @s run effect @s jump_boost 15 2 true
execute as @a[hasitem={item=fables_avatars:diving_helmet_mask,location=slot.armor.head}] at @s if block ~ ~1 ~ water run effect @s conduit_power 15 0 true
execute as @a[hasitem={item=fables_misc:goldglass,location=slot.armor.head}] at @s run effect @s village_hero 15 0 true
execute as @a[hasitem={item=fables_avatars:mining_helmet,location=slot.armor.head}] at @s run effect @s haste 15 1 true

execute as @a at @s run fill  ~-16 ~-10 ~-16 ~16 ~10 ~16 air replace light_block_9
execute as @a at @s run fill  ~-16 ~-10 ~-16 ~16 ~10 ~16 air replace light_block_15
execute as @a[hasitem={item=fables_avatars:mining_helmet,location=slot.armor.head}] at @s run fill  ~ ~1 ~ ~ ~1 ~ light_block_15 replace air
