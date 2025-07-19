export class MfBrazier {
	onPlace(e) {
		const { block } = e;
		UpdateBrazier(block);
		if (block.above().hasTag("mf:brazier")) UpdateBrazier(block.above());
		if (block.below().hasTag("mf:brazier")) UpdateBrazier(block.below());
	}
	onPlayerDestroy(e) {
		const { block } = e;
		if (block.above().hasTag("mf:brazier")) UpdateBrazier(block.above());
		if (block.below().hasTag("mf:brazier")) UpdateBrazier(block.below());
	}
	onStepOn(e) {
		const { entity } = e;
		entity.setOnFire(10, true);
	}
}
function UpdateBrazier(block) {
	const topHasTag = block.above().hasTag("mf:brazier");
	const botHasTag = block.below().hasTag("mf:brazier");
	const state = topHasTag && botHasTag ? 2 : topHasTag && !botHasTag ? 3 : !topHasTag && botHasTag ? 1 : 0;
	block.setPermutation(block.permutation.withState("medieval:state", state));
}