import { BlockPermutation } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui'
import { spawnEntityRotatedByBlock } from '../util/utils';

export class MfTopBlockDestroy {
	onPlayerDestroy(e) {
		const { block } = e;
		block.below().setPermutation(BlockPermutation.resolve("minecraft:air"));
	}
}
export class MfPendulumClock {
	onPlace(e) {
		const { block } = e;
		const isPlaced = block.permutation.getState("mc:placed");
		if (isPlaced) return;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		spawnEntityRotatedByBlock("medieval:pendulum_clock", block.above(), direction);
	}
}
export class MfEditPendulumClock {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const part = block.permutation.getState("mc:block_parts");
		const pendulumBlock = part === 0 ? block.above() : block;
		const clockEntity = dimension.getEntitiesAtBlockLocation(pendulumBlock).find(entity => entity.typeId === "medieval:pendulum_clock");
		if (!clockEntity) return;
		const lockProperties = clockEntity.getProperty("mf:lock_properties");
		if (lockProperties) {
			dimension.playSound("block.sign.waxed_interact_fail", block.center());
			return;
		}
		new ModalFormData()
		.title({ translate: "mf.ui.settings.title" })
		.toggle({ translate: "mf.ui.clock.enable_sounds", with: [ "\n" ] }, clockEntity.getProperty("mf:enable_sounds"))
		.toggle({ translate: "mf.ui.clock.animations", with: [ "\n" ] }, clockEntity.getProperty("mf:animations"))
		.toggle({ translate: "mf.ui.clock.lock_properties", with: [ "\n" ] }, clockEntity.getProperty("mf:lock_properties"))
		.show(player).then( (r) => {
			if (r.canceled) return;
			const [ sounds, animations, lock ] = r.formValues;
			clockEntity.setProperty("mf:enable_sounds", sounds);
			clockEntity.setProperty("mf:animations", animations);
			clockEntity.setProperty("mf:lock_properties", lock);
		})
	}
}