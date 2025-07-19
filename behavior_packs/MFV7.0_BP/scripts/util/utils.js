import { BlockPermutation, GameMode, ItemEnchantableComponent, ItemStack } from "@minecraft/server";
import { colors } from "./globalVariables";

export function itemApplyDamage(player, item) {
	if (isCreative(player)) return;
	const inventory = player.getComponent("inventory");
	const durabilityComponent = item.getComponent("durability");

	let applyDamage = true;

	const unbreaking = item.getComponent(ItemEnchantableComponent.componentId)?.getEnchantment("unbreaking");
	if (unbreaking) {
		const level = unbreaking.level;
		const probabilities = { 1: 0.5, 2: 0.666, 3: 0.75 };
		const probability = probabilities[level] || 0;
		applyDamage = Math.random() > probability;
	}
	if (durabilityComponent.damage >= durabilityComponent.maxDurability) {
		player.dimension.playSound("random.break", player.location);
		inventory.container.setItem(player.selectedSlotIndex, undefined);
	} else if (applyDamage) {
		durabilityComponent.damage += 1;
		inventory.container.setItem(player.selectedSlotIndex, item);
	}
};
export function addItemOrSpawn(player, ItemStackObj, inCreative = false) {
	if (isCreative(player) && !inCreative) return;
	const inventory = player.getComponent("inventory").container;
	let remainingAmount = ItemStackObj.amount;
	const itemType = ItemStackObj.typeId;
	for (let slot = 0; slot < inventory.size; slot++) {
		const currentItem = inventory.getItem(slot);
		if (currentItem?.isStackableWith(ItemStackObj) && currentItem.amount < currentItem.maxAmount) {
			const spaceLeft = currentItem.maxAmount - currentItem.amount;
			const amountToAdd = Math.min(remainingAmount, spaceLeft);
			currentItem.amount += amountToAdd;
			inventory.setItem(slot, currentItem);
			remainingAmount -= amountToAdd;
			if (remainingAmount <= 0) return;
		}
	}
	if (remainingAmount > 0 && inventory.emptySlotsCount > 0) {
		const newStack = new ItemStack(itemType, remainingAmount);
		inventory.addItem(newStack);
		return;
	}
	if (remainingAmount > 0) {
		const leftoverStack = new ItemStack(itemType, remainingAmount);
		player.dimension.spawnItem(leftoverStack, itemLocationFrontPlayer(player, 1));
	}
}
export function decrementItemInHand(player, inCreative = false, amount = 1) {
	if (isCreative(player) && !inCreative) return;
	const inventory = player.getComponent("inventory").container;
	const selectedSlotIndex = player.selectedSlotIndex;
	const item = inventory.getItem(selectedSlotIndex);
	if (!item) return;
	if (item.amount > amount) {
		item.amount -= amount;
		inventory.setItem(selectedSlotIndex, item);
	} else {
		inventory.setItem(selectedSlotIndex, undefined);
	}
};
export function itemLocationFrontPlayer(player, distance) {
	const viewDirection = player.getViewDirection();
	const headLocation = player.location;
	const spawnX = headLocation.x + viewDirection.x * distance;
	const spawnY = headLocation.y + 0.3;
	const spawnZ = headLocation.z + viewDirection.z * distance;

	return ({ x: spawnX, y: spawnY, z: spawnZ });
};
export function handleSitOnFurniture(e, entityType, yOffset) {
	const player = e.player;
	const block = e.block;
	if (e.dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === entityType)) return;
	const chairEntity = e.dimension.spawnEntity(entityType, {x: block.x + 0.5, y: block.y + yOffset, z: block.z + 0.5});
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	chairEntity.setRotation({x: 0, y: {south: 0, north: 180, west: 90, east: -90}[direction]});
	chairEntity.getComponent("rideable").addRider(player);
};
export function handleSitOnNewFurniture(e, entityType, yOffset) {
	const player = e.player;
	const block = e.block;
	if (e.dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === entityType)) return;
	const chairEntity = e.dimension.spawnEntity(entityType, {x: block.x + 0.5, y: block.y + yOffset, z: block.z + 0.5});
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	chairEntity.setRotation({x: 0, y: {south: 0, north: 180, west: 90, east: -90}[direction]});
	chairEntity.getComponent("rideable").addRider(player);
};
export function isCreative(player) {
	return player.matches({ gameMode: GameMode.creative });
};
export function toggleBlockState(e, stateKey, soundOn, soundOff) {
	let permutation = e.block.permutation;
	let currentState = permutation.getState(stateKey);
	let newPermutation = permutation.withState(stateKey, !currentState);
	e.block.setPermutation(newPermutation);
	e.dimension.playSound(currentState ? soundOff : soundOn, e.block.location);
};
export function addOrReplaceItem(player, itemAdded, n) {
	if (isCreative(player)) return;
	const inventory = player.getComponent("inventory").container;
	const item = inventory.getItem(player.selectedSlotIndex);
	if (item?.amount > 1) {
		decrementItemInHand(player);
		addItemOrSpawn(player, new ItemStack(itemAdded, n));
	} else {
		inventory.setItem(player.selectedSlotIndex, new ItemStack(itemAdded, n));
	}
};

export function handleSitOld(e, entityType, yOffset) {
	const player = e.player;
	const block = e.block;
	if (e.dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === entityType)) return;
	const chairEntity = e.dimension.spawnEntity(entityType, {x: block.x + 0.5, y: block.y + yOffset, z: block.z + 0.5});
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	chairEntity.setRotation({x: 0, y: {south: 180, north: 0, west: -90, east: 90}[direction]});
	chairEntity.getComponent("rideable").addRider(player);
};
export function simpleToggleBlockState(block, stateKey) {
	let permutation = block.permutation;
	let currentState = permutation.getState(stateKey);
	let newPermutation = permutation.withState(stateKey, !currentState);
	block.setPermutation(newPermutation);
};
export function breakBlock(block) {
	block.dimension.runCommandAsync(`setblock ${block.x} ${block.y} ${block.z} air destroy`);
}
export function breakBlockWithItems(player, block, itemlist, state) {
	if (isCreative(player)) return;
	if (state > 0) block.dimension.spawnItem(new ItemStack(itemlist[state - 1], 1), block.center());
}
export function getDirectionByPlayer(player) {
	const yRotation = player.getRotation().y;
	const direction = (yRotation >= -45 && yRotation <= 45) ? "north" : (yRotation > 45 && yRotation <= 135) ? "east" : (yRotation < -45 && yRotation >= -135) ? "west" : "south";
	return direction;
}
export function spawnItemSilkTouch(e, itemName, quantity = 1) {
	const { player, block, dimension } = e;
	if (player.matches({ gameMode: GameMode.creative })) return;
	const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
	if (!item) return;
	const hasSilkTouch = item.getComponent(ItemEnchantableComponent.componentId)?.getEnchantment("silk_touch");
	if (!hasSilkTouch) return;
	dimension.spawnItem(new ItemStack(itemName, quantity), block.center());
}
//NUEVAS FUNCIONES :)
export function setBlockParts(parts, id, direction, isPlaced) {
	parts.forEach(({ target, part }) => {
		const params = {
			"minecraft:cardinal_direction": direction,
			"mc:block_parts": part
		};
		if (isPlaced) params["mc:placed"] = true;
		
		target.setPermutation(BlockPermutation.resolve(id, params));
	});
}
export function decrementItemInInventory(entity, slot, options = {}) {
	const { amount = 1, inCreative = false, convertTo = undefined } = options;
	if (entity.typeId === "minecraft:player" && isCreative(entity) && !inCreative) return;
	const inventory = entity.getComponent("inventory")?.container;
	if (!inventory) return;
	const item = inventory.getItem(slot);
	if (!item) return;
	if (item.amount > amount) {
		item.amount -= amount;
		inventory.setItem(slot, item);
	} else inventory.setItem(slot, convertTo);
}
export function addItemInInventory(entity, slot, itemStack) {
	const inventory = entity.getComponent("inventory")?.container;
	if (!inventory) return false;
	const currentItem = inventory.getItem(slot);
	if (!currentItem) {
		inventory.setItem(slot, itemStack);
	} else if (currentItem.typeId === itemStack.typeId && currentItem.amount < currentItem.maxAmount) {
		const newAmount = Math.min(currentItem.amount + itemStack.amount, currentItem.maxAmount);
		currentItem.amount = newAmount;
		inventory.setItem(slot, currentItem);
	} else {
		return false;
	}
	return true;
}
export function sitOn(block, player, entityType, { x = 0, y = 0, z = 0 } = {}) {
	if (block.dimension.getEntitiesAtBlockLocation(block.location).some(e => e.typeId === entityType)) return;
	const dir = block.permutation.getState("minecraft:cardinal_direction");
	spawnEntityRotatedByBlock(entityType, block, dir, { x, y, z }).getComponent("rideable").addRider(player);
}
export function spawnEntityRotatedByBlock(id, block, direction, { x = 0, y = 0, z = 0 } = {}) {
	const center = block.center();
	const pos = {
		x: center.x + (direction === 'north' ? x : direction === 'south' ? -x : direction === "west" ? z : -z),
		y: center.y + y,
		z: center.z + (direction === 'north' ? z : direction === 'south' ? -z : direction === 'west' ? -x : x)
	};
	const entity = block.dimension.spawnEntity(id, pos);
	entity.setRotation({ x: 0, y: { south: 0, north: 180, west: 90, east: -90 }[direction] });
	return entity;
}
export function sitOnChairXZ(e, yOffset, d) {
	const { player, block, dimension } = e;
	if (dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === "medieval:sit_bench")) return;
	const directionData = {
		north: { xOffset: 0, zOffset: -d, rotation: 180 },
		south: { xOffset: 0, zOffset: d, rotation: 0 },
		west: { xOffset: -d, zOffset: 0, rotation: 90 },
		east: { xOffset: d, zOffset: 0, rotation: -90 }
	};
	const permutation = block.permutation.getState("minecraft:cardinal_direction");
	const { xOffset = 0, zOffset = 0, rotation = 0 } = directionData[permutation] || {};
	const entityList = dimension.getEntitiesAtBlockLocation(block.location);
	for (const entity of entityList) {if (entity.typeId === "medieval:sit_bench") {return;}}
	const chairEntity = dimension.spawnEntity("medieval:sit_bench", {
		x: block.center().x + xOffset,
		y: block.y + yOffset,
		z: block.center().z + zOffset
	});
	chairEntity.setRotation({ x: 0, y: rotation });
	chairEntity.getComponent("rideable").addRider(player);
};
export function extractColor(blockId) {
	const colorPattern = new RegExp(colors.join("|"), "i");
	const match = blockId.match(colorPattern);
	return match ? match[0] : 'black';
}