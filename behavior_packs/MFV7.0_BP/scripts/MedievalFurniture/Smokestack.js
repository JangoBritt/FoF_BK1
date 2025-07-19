import { airBlocks } from '../util/globalVariables';

export class MfSmokestackTick {
	onTick(e) {
		const { block, dimension } = e;
		if (airBlocks.includes(block.above().typeId)) dimension.spawnParticle("medieval:particle_smoke", {x:block.x + 0.5, y: block.y + 1.2, z: block.z + 0.5});
	}
}
export class MfSmokestack {
	onPlace(e) {
		updatePlacedSmokestack(e.block);
		updateNearestSmokestack(e.block);
	}
	onPlayerDestroy(e) {
		updateNearestSmokestack(e.block);
	}
}
function updatePlacedSmokestack(block) {
	const topHasTag = block.above().hasTag("mf:smokestack");
	const state = topHasTag ? 1 : 0;
	block.setPermutation(block.permutation.withState("medieval:state", state));
}
function updateNearestSmokestack(block) {
	if (block.below().hasTag("mf:smokestack")) updatePlacedSmokestack(block.below());
}