import { rightBlockLocation, leftBlockLocation, backBlockLocation } from '../util/globalVariables';

export class MrSofa {
	onPlace(e) {
		updateSofa(e.block);
		updateNearestSofa(e.block, e.block.permutation);
	}
	onPlayerDestroy(e) {
		updateNearestSofa(e.block, e.destroyedBlockPermutation);
	}
}
function updateSofa(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const blockProperties = {
		"north": { right: { x: 1, y: 0, z: 0, allow: "east" }, left: { x: -1, y: 0, z: 0, allow: "west" } },
		"south": { right: { x: -1, y: 0, z: 0, allow: "west" }, left: { x: 1, y: 0, z: 0, allow: "east" } },
		"west": { right: { x: 0, y: 0, z: -1, allow: "north" }, left: { x: 0, y: 0, z: 1, allow: "south" } },
		"east": { right: { x: 0, y: 0, z: 1, allow: "south" }, left: { x: 0, y: 0, z: -1, allow: "north" } }
	};
	function checkSide(side) {
		const { x, y, z, allow } = blockProperties[direction][side];
		const sideBlock = block.offset({ x, y, z });
		const sideDirection = sideBlock.permutation.getState("minecraft:cardinal_direction");

		return sideBlock.hasTag("mr:sofa") && (sideDirection === direction || sideDirection === allow) ? 1 : 0;
	}
	block.setPermutation(block.permutation.withState("mr:r", checkSide("right")).withState("mr:l", checkSide("left")));
	const cornerProperties = {
		"north": [
			{ location: { x: -1, y: 0, z: 0 }, requiredDirection: "north", check: { x: 0, y: 0, z: 1, direction: "east" } },
			{ location: { x: 1, y: 0, z: 0 }, requiredDirection: "north", check: { x: 0, y: 0, z: 1, direction: "west" } }
		],
		"south": [
			{ location: { x: 1, y: 0, z: 0 }, requiredDirection: "south", check: { x: 0, y: 0, z: -1, direction: "west" } },
			{ location: { x: -1, y: 0, z: 0 }, requiredDirection: "south", check: { x: 0, y: 0, z: -1, direction: "east" } }
		],
		"west": [
			{ location: { x: 0, y: 0, z: -1 }, requiredDirection: "west", check: { x: 1, y: 0, z: 0, direction: "south" } },
			{ location: { x: 0, y: 0, z: 1 }, requiredDirection: "west", check: { x: 1, y: 0, z: 0, direction: "north" } }
		],
		"east": [
			{ location: { x: 0, y: 0, z: 1 }, requiredDirection: "east", check: { x: -1, y: 0, z: 0, direction: "north" } },
			{ location: { x: 0, y: 0, z: -1 }, requiredDirection: "east", check: { x: -1, y: 0, z: 0, direction: "south" } }
		]
	};
	const properties = cornerProperties[direction];
	let shouldSetPermutation = 0;
	for (const prop of properties) {
		const targetBlock = block.offset(prop.location);
		const checkBlock = block.offset(prop.check);

		if (targetBlock.hasTag("mr:sofa") && targetBlock.permutation.getState("minecraft:cardinal_direction") === prop.requiredDirection && checkBlock.permutation.getState("minecraft:cardinal_direction") === prop.check.direction) {
			shouldSetPermutation = 1;
			break;
		}
	}
	block.setPermutation(block.permutation.withState("mr:f", shouldSetPermutation));
}
function updateNearestSofa(block, permutation) {
	const direction = permutation.getState("minecraft:cardinal_direction");
	const rightBlock = block.offset(leftBlockLocation[direction]);
	const leftBlock = block.offset(rightBlockLocation[direction]);
	const frontBlock = block.offset(backBlockLocation[direction]);
	if (rightBlock.hasTag("mr:sofa")) updateSofa(rightBlock);
	if (leftBlock.hasTag("mr:sofa")) updateSofa(leftBlock);
	if (frontBlock.hasTag("mr:sofa")) updateSofa(frontBlock);
}