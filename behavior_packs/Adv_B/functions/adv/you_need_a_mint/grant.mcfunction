tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has reached the goal §a[You Need a Mint]"}]}

tag @s add NeedMint

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add EndCount dummy
scoreboard players add @s EndCount 1