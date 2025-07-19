import { sitOn } from '../util/utils';

export class MfIronThrone {
	onPlayerInteract(e) {
		const { player, block } = e;
		const part = block.permutation.getState("mc:block_parts");
		const blockPart = part === 0 ? e.block : e.block.below();
		sitOn(blockPart, player, "medieval:sit_bench", { y: -0.1, z: -0.1 });
	}
}