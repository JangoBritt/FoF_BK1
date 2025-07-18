import { ItemStack } from '@minecraft/server';

export const COOKING_RECIPES = {
	"minecraft:chicken": { result: "minecraft:cooked_chicken" },
	"minecraft:porkchop": { result: "minecraft:cooked_porkchop" },
	"minecraft:beef": { result: "minecraft:cooked_beef" },
	"minecraft:mutton": { result: "minecraft:cooked_mutton" },
	"minecraft:rabbit": { result: "minecraft:cooked_rabbit" },
	"minecraft:cod": { result: "minecraft:cooked_cod" },
	"minecraft:salmon": { result: "minecraft:cooked_salmon" },
	"minecraft:kelp": { result: "minecraft:dried_kelp" },
	"minecraft:potato": { result: "minecraft:baked_potato" },
	"mr:flesh": { result: "mr:cooked_flesh" }
};
export const FUEL_DURATION = {
	"minecraft:coal": 80,
	"minecraft:charcoal": 80,
	"minecraft:blaze_rod": 120,
	"minecraft:dried_kelp_block": 200,
	"minecraft:coal_block": 800,
	"minecraft:lava_bucket": 1000
}