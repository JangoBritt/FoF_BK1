import { world, system, BlockVolume, ItemStack, BlockPermutation, GameMode } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';
import { airBlocks } from '../util/globalVariables';
import { decrementItemInHand, getDirectionByPlayer } from '../util/utils';

function validateAirArea(startPos, endBlock) {
	const minX = Math.min(startPos.x, endBlock.x);
	const maxX = Math.max(startPos.x, endBlock.x);
	const minY = Math.min(startPos.y, endBlock.y);
	const maxY = Math.max(startPos.y, endBlock.y);
	const minZ = Math.min(startPos.z, endBlock.z);
	const maxZ = Math.max(startPos.z, endBlock.z);
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			for (let z = minZ; z <= maxZ; z++) {
				const currentBlock = endBlock.dimension.getBlock({x, y, z});
				if (!currentBlock?.matches("minecraft:air")) {
					return false;
				}
			}
		}
	}
	return true;
}
export class MfWinch {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const winch = dimension.getEntitiesAtBlockLocation(block.location).find(e => e.matches({ type: "medieval:winch_entity" }));
		if (!winch || winch.getProperty("mf:wait")) return;
		const dyProps = winch.getDynamicProperty("mf:properties");
		if (!dyProps) return;
		const props = JSON.parse(dyProps);
		const isOpen = winch.getProperty("mf:is_open");
		const { start, end, height, openSize, direction, spawnPos } = props;
		if (player.isSneaking && !isOpen) {
			new ModalFormData()
			.title({ translate: "mf.ui.winch.open_size.title" })
			.slider({ translate: "mf.ui.winch.open_size.slider", with: [ "\n", `${height}` ] }, 3, height, 1, openSize)
			.show(player).then((r) => {
				if (r.canceled) return;
				const [newOpenSize] = r.formValues;
				props.openSize = newOpenSize;
				winch.setDynamicProperty("mf:properties", JSON.stringify(props));
				player.sendMessage({ translate: "mf.ui.winch.open_size.updated", with: [ `${height}` ] });
			});
			return;
		}
		const heightAdjust = openSize - 1;
		const [lowerY, upperY] = [Math.min(start.y, end.y), Math.max(start.y, end.y)];
		const airArea = {
			start: { ...start, y: lowerY },
			end: { ...end, y: upperY }
		};

		if (isOpen) {
			props.start.y += heightAdjust;
			props.end.y += heightAdjust;
			airArea.end.y -= (height - openSize + 1);
		} else {
			airArea.start.y += height;
			airArea.end.y += heightAdjust;
		}
		if (!validateArea(props.start, dimension.getBlock(props.end), props.blockType, props.direction)) return player.sendMessage({ translate: "mf.ui.winch.area.invalid", with: [ "\n" ] });
		if (!validateAirArea(airArea.start, dimension.getBlock(airArea.end))) return player.sendMessage({ translate: "mf.ui.winch.air_area.invalid", with: [ "\n" ] });

		const port = dimension.spawnEntity("medieval:portcullis", spawnPos);
		const rotationY = {south: 0, north: 0, west: 90, east: 90}[direction];

		port.setProperty("mf:width", props.width);
		port.setProperty("mf:height", props.height);
		port.setProperty("mf:open_size", props.openSize);
		port.setRotation({ x: 0, y: rotationY });
		port.setDynamicProperty("mf:properties", dyProps);
		port.triggerEvent(`mf:height_${props.openSize}`);
		winch.triggerEvent(`mf:height_${props.openSize}`);
		port.setProperty("mf:is_open", !isOpen);
		winch.setProperty("mf:is_open", !isOpen);
		dimension.fillBlocks(new BlockVolume(props.start, props.end), "minecraft:air");
		winch.setProperty("mf:wait", true);
	}
	onPlayerDestroy(e) {
		if (!e.player.matches({ gameMode: GameMode.creative })) e.dimension.spawnItem(new ItemStack("medieval:winch_size", 1), e.block.center());
	}
}
export function PortcullisFillArea() {
	world.afterEvents.dataDrivenEntityTrigger.subscribe((e) => {
		const { entity } = e;
		const dyProps = entity.getDynamicProperty("mf:properties");
		if (!dyProps) return;
		const props = JSON.parse(dyProps);
		if (entity.getProperty("mf:is_open")) {
			props.start.y += (props.openSize - 1);
			props.end.y += (props.openSize - 1);
		}
		entity.dimension.fillBlocks(new BlockVolume(props.start, props.end), BlockPermutation.resolve(props.blockType, { "minecraft:cardinal_direction": props.direction }));
		system.runTimeout(() => { entity.remove() }, 5);
	}, {
		entityTypes: [ "medieval:portcullis" ],
		eventTypes: [ "mf:end_timer" ]
	});
}
function calculatePortcullisPosition(start, end, direction, width) {
	const isNorthSouth = (direction === "north" || direction === "south");
	const avg = (a, b) => {
		const sum = a + b;
		return width % 2 === 0 ? Math.floor(sum / 2) + 0.5 : Math.round(sum / 2) + 0.5;
	};
	return {
		x: isNorthSouth ? avg(start.x, end.x) : start.x + 0.5,
		y: Math.min(start.y, end.y),
		z: isNorthSouth ? start.z + 0.5 : avg(start.z, end.z)
	};
}
export class MfPlaceWinch {
	onUseOn(e) {
		const { block, blockFace, source, itemStack } = e;
		if (blockFace !== "Up") return;
		const props = itemStack.getDynamicProperty("mf:size");
		if (!props) return source.sendMessage({ translate: "mf.ui.winch.no_data.warning", with: [ "\n" ] });
		const data = JSON.parse(props);
		const { start, end, direction, width } = data;
		data.spawnPos = calculatePortcullisPosition(start, end, direction, width);
		const blockPlace = block.above();
		if (!airBlocks.includes(blockPlace.typeId)) return;
		const dx = data.spawnPos.x - blockPlace.x;
		const dy = data.spawnPos.y - blockPlace.y;
		const dz = data.spawnPos.z - blockPlace.z;
		const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

		if (distance > 32) {
			source.sendMessage({ translate: "mf.ui.winch.too_far", with: [ "\n", `${distance.toFixed(1)}` ] });
			return;
		}
		const blockDir = getDirectionByPlayer(source);
		const winch = block.dimension.spawnEntity("medieval:winch_entity", { x: block.x + 0.5, y: block.y + 1, z: block.z + 0.5 });
		blockPlace.setPermutation(BlockPermutation.resolve("medieval:winch", { "minecraft:cardinal_direction": blockDir }));
		winch.setRotation({ x: 0, y: {south: 0, north: 180, west: 90, east: -90}[blockDir]});
		
		winch.setDynamicProperty("mf:properties", JSON.stringify(data));
		decrementItemInHand(source, true);
	}
	onUse(e) {
		removeProperties(e.itemStack, e.source, { translate: "mf.ui.winch.cleared_notice", with: [ "\n" ] }, e.source.isSneaking);
	}
}
export class MfWinchSetSize {
	onUseOn(e) {
		const { block, source, itemStack } = e;
		if (!block.matches("medieval:portcullis_block")) return;

		const direction = block.permutation.getState("minecraft:cardinal_direction");
		let data = itemStack.getDynamicProperty("mf:size") ? JSON.parse(itemStack.getDynamicProperty("mf:size")) : null;
		if (!data) {
			data = {
				start: { x: block.x, y: block.y, z: block.z },
				direction: direction,
				blockType: block.typeId
			}
			itemStack.setDynamicProperty("mf:size", JSON.stringify(data));
			itemStack.setLore([ `From: x: ${block.x}, y: ${block.y}, z: ${block.z}` ]);
			source.getComponent("inventory").container.setItem(source.selectedSlotIndex, itemStack);
			return source.sendMessage({ translate: "mf.ui.winch.start_position", with: [`${block.x} ${block.y} ${block.z}` ] });
		}
		data.end = { x: block.x, y: block.y, z: block.z };
		const dx = Math.abs(data.end.x - data.start.x);
		const dy = Math.abs(data.end.y - data.start.y);
		const dz = Math.abs(data.end.z - data.start.z);
		
		const width = (direction === "north" || direction === "south") ? dx + 1 : dz + 1;
		const height = dy + 1;

		if (width > 15 || height > 16) return source.sendMessage({ translate: "mf.ui.winch.error_area_too_large", with: [ "\n" ] });
		if (dy < 2) return source.sendMessage({ translate: "mf.ui.winch.error_min_height", with: [ "\n" ] });
		
		const dirCheck = {
			north_south: () => data.end.z !== data.start.z,
			east_west: () => data.end.x !== data.start.x
		};
		if (((direction === "north" || direction === "south") && dirCheck.north_south()) || ((direction === "east" || direction === "west") && dirCheck.east_west())) return removeProperties(itemStack, source, { translate: "mf.ui.winch.error_row_only", with: [ "\n" ] });
		if (!validateArea(data.start, block, data.blockType, data.direction)) return source.sendMessage({ translate: "mf.ui.winch.area.invalid", with: [ "\n" ] });

		data.width = width;
		data.height = height;
		data.openSize = height;
		const newItem = new ItemStack("medieval:winch", 1);
		newItem.setDynamicProperty("mf:size", JSON.stringify(data));
		newItem.setLore([
			`From: x: ${data.start.x}, y: ${data.start.y}, z: ${data.start.z}`,
			`To: x: ${data.end.x}, y: ${data.end.y}, z: ${data.end.z}`
		]);
		source.getComponent("inventory").container.setItem(source.selectedSlotIndex, newItem);
		source.sendMessage({ translate: "mf.ui.winch.area_set", with: [ `${width}x${height}` ] });
	}
	onUse(e) {
		removeProperties(e.itemStack, e.source, { translate: "mf.ui.winch.cleared_notice", with: [ "\n" ] }, e.source.isSneaking);
	}
}
function removeProperties(itemStack, source, message, condition = true) {
	if (!condition) return;
	if (itemStack.getDynamicProperty("mf:size") || itemStack.typeId === "medieval:winch") {
		const inventory = source.getComponent("inventory").container;
		inventory.setItem(source.selectedSlotIndex, new ItemStack("medieval:winch_size", 1));
		source.sendMessage(message);
	}
}
function validateArea(startPos, endBlock, expectedType, expectedDirection) {
	const minX = Math.min(startPos.x, endBlock.x);
	const maxX = Math.max(startPos.x, endBlock.x);
	const minY = Math.min(startPos.y, endBlock.y);
	const maxY = Math.max(startPos.y, endBlock.y);
	const minZ = Math.min(startPos.z, endBlock.z);
	const maxZ = Math.max(startPos.z, endBlock.z);
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			for (let z = minZ; z <= maxZ; z++) {
				const currentBlock = endBlock.dimension.getBlock({x, y, z});
				if (!currentBlock?.matches(expectedType, { "minecraft:cardinal_direction": expectedDirection })) {
					return false;
				}
			}
		}
	}
	return true;
}
function updatePortcullis(block) {
	block.setPermutation(block.permutation.withState("mf:top", block.below().matches(block.typeId)));
}
function updateAdjacentPortcullis(block, id) {
	if (block.above().matches(id)) updatePortcullis(block.above());
}
export class MfPortcullisBlock {
	onPlace(e) {
		updatePortcullis(e.block);
		updateAdjacentPortcullis(e.block, e.block.typeId);
	}
	onPlayerDestroy(e) {
		updateAdjacentPortcullis(e.block, e.destroyedBlockPermutation.type.id);
	}
}