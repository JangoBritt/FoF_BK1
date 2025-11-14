import { ItemStack } from "@minecraft/server";

export const FOOD_TYPE = new Map([
	["minecraft:chicken", "minecraft:cooked_chicken"],
	["minecraft:porkchop", "minecraft:cooked_porkchop"],
	["minecraft:beef", "minecraft:cooked_beef"],
	["minecraft:mutton", "minecraft:cooked_mutton"],
	["minecraft:rabbit", "minecraft:cooked_rabbit"],
	["minecraft:cod", "minecraft:cooked_cod"],
	["minecraft:salmon", "minecraft:cooked_salmon"],
	["minecraft:kelp", "minecraft:dried_kelp"],
	["minecraft:potato", "minecraft:baked_potato"],
	["mr:flesh", "mr:cooked_flesh"],

	//Fables
	["nicothekid:rat_raw", "nicothekid:rat_cooked"],

	//Farmers Delight
	["farmersdelight:bacon", "farmersdelight:cooked_bacon"],
	["farmersdelight:minced_beef", "farmersdelight:beef_patty"],
	["farmersdelight:chicken_cuts", "farmersdelight:cooked_chicken_cuts"],
	["farmersdelight:cod_slice", "farmersdelight:cooked_cod_slice"],
	["farmersdelight:mutton_chops", "farmersdelight:cooked_mutton_chops"],
	["farmersdelight:salmon_slice", "farmersdelight:cooked_salmon_slice"],
	["minecraft:egg", "farmersdelight:fried_egg"],
	["minecraft:blue_egg", "farmersdelight:fried_egg"],
	["minecraft:brown_egg", "farmersdelight:fried_egg"],

	//Expansive Biomes
	["wypnt_bab:crocodile_meat", "wypnt_bab:cooked_crocodile_meat"],
	["wypnt_bab:venison", "wypnt_bab:cooked_venison"],
	// Add more food items by following this pattern:
	// ["raw_item_id", "cooked_item_id"],
]);
export const FREEZE_DURATION = {
	"minecraft:snowball": 1,
	"minecraft:snow": 4,
	"minecraft:ice": 6,
	"minecraft:packed_ice": 54,
	"minecraft:blue_ice": 486
	// Add custom items that act as freezing sources. Format:
	// "namespace:item_id": freezeTimeInSeconds
};
export const FREEZING_RECIPES = {
	"minecraft:water_bucket": { freezing: "minecraft:ice", convertTo: new ItemStack("minecraft:bucket", 1) },
	"minecraft:ice": { freezing: "minecraft:packed_ice" },
	"minecraft:packed_ice": { freezing: "minecraft:blue_ice" },
	"minecraft:lava_bucket": { freezing: "minecraft:obsidian", convertTo: new ItemStack("minecraft:bucket", 1) },
	"minecraft:rotten_flesh": { freezing: "mr:flesh" },
	//"minecraft:poisonous_potato": { freezing: "minecraft:potato" }, // No se porque no funciona XD
};