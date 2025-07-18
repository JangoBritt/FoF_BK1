import { BlockPermutation } from '@minecraft/server';
import { decrementItemInHand, spawnItemSilkTouch } from '../util/utils';
import { airBlocks } from '../util/globalVariables';
import { getWoodType } from './Sounds';

const placeSounds = {
	bamboo: "break.bamboo_wood_hanging_sign",
	cherry: "break.cherry_wood_hanging_sign",
	nether: "break.hanging_sign",
	default: "break.nether_wood_hanging_sign"
}
export class MfStreetlight {
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const directionMap = { north: block.south(), south: block.north(), west: block.east(), east: block.west() };
		if (directionMap[direction].hasTag("mf:streetlight_0")) updateStreetlight(directionMap[direction]);
		const itemId = destroyedBlockPermutation.type.id.replace("_streetlight", "").replace("medieval", "minecraft");
		spawnItemSilkTouch(e, itemId);
	}
}
function findTopAirBlock(block, maxHeightCheck = 32) {
	const blockAbove = block.above();
	if (airBlocks.includes(blockAbove.typeId)) return blockAbove;
	return findTopAirBlock(blockAbove, maxHeightCheck - 1);
}
export class MfPostStreetlight {
	onPlace(e) {
		updateStreetlight(e.block);
		updateNearestStreetlights(e.block);
	}
	onPlayerDestroy(e) {
		updateNearestStreetlights(e.block);
	}
	onPlayerInteract(e) {
		const { player, block, dimension, face } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if (item?.typeId.includes("_streetlight_0")) {
			const topAirBlock = findTopAirBlock(block);
			if (!topAirBlock) return;
			topAirBlock.setPermutation(BlockPermutation.resolve(item.typeId));
			decrementItemInHand(player);
			dimension.playSound(placeSounds[getWoodType(item.typeId)], block.center());
			return;
		}
		if (block.permutation.getState("medieval:top") === 0) return;
		const allowedItems = ['minecraft:lantern', 'minecraft:soul_lantern'];
		const directions = {
			North: { state: "medieval:n", method: block.north() },
			South: { state: "medieval:s", method: block.south() },
			West: { state: "medieval:w", method: block.west() },
			East: { state: "medieval:e", method: block.east() },
		};
		const direction = directions[face];
		if (!direction || block.permutation.getState(direction.state) !== 0 || !allowedItems.includes(item?.typeId) || !airBlocks.includes(direction.method.typeId)) return;
		dimension.playSound("block.lantern.place", block.center());
		direction.method.setPermutation(BlockPermutation.resolve(`${item.typeId.replace("minecraft", "medieval")}_streetlight`,{"minecraft:cardinal_direction": face.toLowerCase()}));
		block.setPermutation(block.permutation.withState(direction.state, 1));
		decrementItemInHand(player);
	}
}
function updateStreetlight(block) {
	const below = block.below();
	const above = block.above();
	const belowHasTag = below.hasTag("mf:streetlight_0");
	const aboveHasTag = above.hasTag("mf:streetlight_0");
	const newState = belowHasTag ? (aboveHasTag ? 1 : 2) : 0;
	const directions = [
		{ state: "n", block: block.north(), tag: "mf:lantern_north" },
		{ state: "s", block: block.south(), tag: "mf:lantern_south" },
		{ state: "w", block: block.west(), tag: "mf:lantern_west" },
		{ state: "e", block: block.east(), tag: "mf:lantern_east" }
	];
	let permutation = block.permutation.withState("medieval:top", newState);
	for (const {state, block, tag} of directions) {
		permutation = permutation.withState(`medieval:${state}`, block.hasTag(tag) ? 1 : 0);
	}
	block.setPermutation(permutation);
}
function updateNearestStreetlights(block) {
	const belowBlock = block.below();
	if (belowBlock.hasTag("mf:streetlight_0")) updateStreetlight(belowBlock);
}