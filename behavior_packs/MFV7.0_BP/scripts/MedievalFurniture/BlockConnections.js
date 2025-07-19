import { world } from '@minecraft/server';
import { solidBlock } from '../util/globalVariables';

export class MfBarsConnection {
	onPlace(e) { updateConnections(e.block, "mc:bars"); }
}
export class MfConnectFence {
	onPlace(e) { updateConnections(e.block, "mc:fence"); }
}
function updateConnections(block, tag) {
	let permutation = block.permutation;
	const neighbors = {"mc:n": block.north(),"mc:s": block.south(),"mc:w": block.west(),"mc:e": block.east()};
	for (const state in neighbors) {
		const neighbor = neighbors[state];
		permutation = permutation.withState(state, neighbor && (solidBlock.has(neighbor.typeId) || neighbor.hasTag("mc:solid_block") || neighbor.hasTag(tag)));
	}
	block.setPermutation(permutation);
}
function checkAdjacentBlocksForConnection(block) {
	const neighbors = [block.north(), block.south(), block.west(), block.east()];
	for (const neighbor of neighbors) {
		if (!neighbor || !neighbor.hasTag("mc:can_connect")) continue;
		const tags = ["mc:bars", "mc:fence", "mc:wall"];
		for (const tag of tags) {
			if (neighbor.hasTag(tag)) {
				updateConnections(neighbor, tag);
			}
		}
	}
}
export function blockConnections() {
	world.afterEvents.playerPlaceBlock.subscribe((e) => {
		checkAdjacentBlocksForConnection(e.block);
	});
	world.afterEvents.playerBreakBlock.subscribe((e) => {
		checkAdjacentBlocksForConnection(e.block);
	});
	world.afterEvents.blockExplode.subscribe((e) => {
		checkAdjacentBlocksForConnection(e.block);
	});
}