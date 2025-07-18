export class MfPillar {
	onPlace(e) {
		updatePlacedPillar(e.block);
		updateNearestPillar(e.block);
	}
	onPlayerDestroy(e) {
		updateNearestPillar(e.block);
	}
}
function updatePlacedPillar(block) {
	const topHasTag = block.above().hasTag("mf:pillar");
	const botHasTag = block.below().hasTag("mf:pillar");
	const state = topHasTag && botHasTag ? 3 : topHasTag && !botHasTag ? 1 : !topHasTag && botHasTag ? 2 : 0;
	block.setPermutation(block.permutation.withState("endx:state", state));
}
function updateNearestPillar(block) {
	if (block.above().hasTag("mf:pillar")) updatePlacedPillar(block.above());
	if (block.below().hasTag("mf:pillar")) updatePlacedPillar(block.below());
}