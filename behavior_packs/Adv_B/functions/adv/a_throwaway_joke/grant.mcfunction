tellraw @a {"rawtext":[{"selector":"@s"},{"text":" has made the advancement §a[A Throwaway Joke]"}]}

tag @s add ThrowawayJoke

scoreboard objectives add AdvancementCount dummy
scoreboard players add @s AdvancementCount 1

scoreboard objectives add AdventureCount dummy
scoreboard players add @s AdventureCount 1