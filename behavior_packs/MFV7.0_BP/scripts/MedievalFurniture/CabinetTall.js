import { BlockPermutation } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';
import { spawnEntityRotatedByBlock } from '../util/utils';
import { airBlocks, leftBlockLocation } from '../util/globalVariables';

export class MfCabinetTallInteract {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const isTop = block.hasTag("mf:cabinet_top");
		const cabinet = dimension.getEntitiesAtBlockLocation(isTop ? block.location : block.above().location).find((e) => e.matches({ families: [ "medieval_cabinet" ] }));
		if (!cabinet) return;
		const playerInv = player.getComponent("inventory").container;
		const item = playerInv.getItem(player.selectedSlotIndex);
		if (item?.typeId !== "medieval:handsaw") {
			cabinet.runCommand(`replaceitem entity @s slot.armor.${isTop ? "head" : "feet"} 0 ${item ? item.typeId : "air"}`);
			playerInv.swapItems(player.selectedSlotIndex, isTop ? 56 : 57, cabinet.getComponent("inventory").container);
		} else {
			const dropdownOptions = [
				{ translate: "mf.ui.animation.options.auto" },
				{ translate: "mf.ui.animation.options.keep_open" },
				{ translate: "mf.ui.animation.options.keep_closed" }
			]
			new ModalFormData()
			.title({ translate: "mf.ui.animation.title" })
			.dropdown({ translate: "mf.ui.animation.mode" }, dropdownOptions, cabinet.getProperty("mf:def_anim"))
			.show(player).then((r) => {
				if (r.canceled) return;
				const [ anim ] = r.formValues;
				cabinet.setProperty("mf:def_anim", anim)
			});
		}
	}
}
export class MfCabinetTall {
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const cabinet = spawnEntityRotatedByBlock("medieval:cabinet_tall_entity", block, direction, { y: 0.5 });
		cabinet.triggerEvent(block.typeId);
		cabinet.nameTag = "med_fur.ui.cabinet_tall";
		cabinet.addEffect("invisibility", 10, { showParticles: false });
		const isRightState = block.offset(leftBlockLocation[direction]).hasTag("mf:cabinet_tall");
		cabinet.setProperty("mf:side_door", isRightState);
		block.setPermutation(block.permutation.withState("medieval:placed", true).withState("medieval:side", isRightState));
		const blockAbove = block.above();
		blockAbove.setPermutation(blockAbove.permutation.withState("medieval:placed", true).withState("medieval:side", isRightState));
	}
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const aboveBlock = block.above();
		if (airBlocks.includes(aboveBlock.typeId)) {
			const direction = permutationToPlace.getState("minecraft:cardinal_direction")
			aboveBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_top`, { "minecraft:cardinal_direction": direction }));
		} else e.cancel = true;
	}
}