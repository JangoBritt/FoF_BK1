import { ItemStack, world } from '@minecraft/server';
import { decrementItemInHand } from '../util/utils';
import { FOOD_TYPE } from './Recipes';

function getGrillArea(faceLocation, blockLocation) {
	const relX = faceLocation.x - Math.floor(blockLocation.x);
	const relZ = faceLocation.z - Math.floor(blockLocation.z);
	return (relX < 0.5) ? (relZ < 0.5 ? 3 : 1) : (relZ < 0.5 ? 2 : 0);
}
function manageGrillEntity(player, dimension, spawnPos, area) {
	const entities = dimension.getEntitiesAtBlockLocation(spawnPos);
	const hasGrillEntity = entities.find(e => {
		const data = e.getDynamicProperty("mr:grill_data");
		return data && JSON.parse(data).area === area;
	});
	if (hasGrillEntity) return;
	const inventory = player.getComponent("inventory").container;
	const item = inventory.getItem(player.selectedSlotIndex);
	if (!item || !FOOD_TYPE.has(item.typeId)) return;
	const cookedFood = FOOD_TYPE.get(item.typeId);
	const food = dimension.spawnEntity("mr:food", spawnPos);
	food.setDynamicProperty("mr:grill_data", JSON.stringify({
		food: item.typeId,
		cooked: cookedFood,
		area
	}));
	food.setRotation({ x: 0, y: player.getRotation().y });
	dimension.playSound("block.itemframe.add_item", spawnPos);
	decrementItemInHand(player);
	food.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${item.typeId}`);
}
export class MrGrill {
	onPlayerInteract(e) {
		const { player, block, dimension, faceLocation } = e;
		const GRILL_OFFSETS = [
			{ x:  0.2, y: 0.4, z:  0.2 },
			{ x: -0.2, y: 0.4, z:  0.2 },
			{ x:  0.2, y: 0.4, z: -0.2 },
			{ x: -0.2, y: 0.4, z: -0.2 }
		];
		const area = getGrillArea(faceLocation, block.location);
		const blockCenter = block.center();
		const spawnPos = {
			x: blockCenter.x + GRILL_OFFSETS[area].x,
			y: blockCenter.y + GRILL_OFFSETS[area].y,
			z: blockCenter.z + GRILL_OFFSETS[area].z
		};
		manageGrillEntity(player, dimension, spawnPos, area);
	}
}
export function foodGrill() {
	world.afterEvents.dataDrivenEntityTrigger.subscribe(({ entity, eventId }) => {
		const foodData = entity.getDynamicProperty("mr:grill_data");
		if (!foodData) return;
		const { cooked, food } = JSON.parse(foodData);
		const { dimension, location } = entity;
		switch (eventId) {
			case "mr:final_cooked":
				entity.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${cooked}`);
				break;
			case "mr:remove_food":
				dimension.spawnItem(new ItemStack(cooked, 1), location);
				entity.remove();
				break;
	
			case "mr:despawn":
				const shouldDropCooked = entity.getProperty("mr:flipped") && entity.getProperty("mr:cooked");
				dimension.spawnItem(new ItemStack(shouldDropCooked ? cooked : food, 1), location);
				entity.remove();
				break;
		}
	}, {
		entityTypes: ["mr:food"],
		eventTypes: ["mr:final_cooked", "mr:remove_food", "mr:despawn"]
	});
}