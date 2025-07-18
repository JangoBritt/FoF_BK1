import { toggleBlockState } from '../util/utils6';
import { sitOnOldChair } from './Util6';

export class MfToilet {
	onPlayerInteract(e) {
		const { player } = e;
		if (player.isSneaking) {
			sitOnOldChair(e, 0.4);
		} else {
			toggleBlockState(e, "medieval:open", "block.barrel.close", "block.barrel.open");
		}
	}
}