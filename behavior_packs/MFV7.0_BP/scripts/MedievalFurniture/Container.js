import { spawnEntityRotatedByBlock } from '../util/utils';

const ENTITY_DATA = {
	"cupboard":  { entity: "medieval:cupboard_entity", name: "ui.title.cupboard" },
	"drawer0":  { entity: "medieval:drawer_0_entity", name: "ui.title.drawer" },
	"drawer1":  { entity: "medieval:drawer_1_entity", name: "ui.title.drawer" },
	"drawer2":  { entity: "medieval:drawer_2_entity", name: "ui.title.drawer" }
};

export class MfContainer {
	onPlace(e) {
		const block = e.block;
		const id = block.typeId;
		const suffix = id.split("_").slice(-1)[0];
		const map = ENTITY_DATA[suffix];
		if (!map) return;
		const furniture = spawnEntityRotatedByBlock(map.entity, block, block.permutation.getState("minecraft:cardinal_direction"));
		furniture.triggerEvent(id);
		furniture.nameTag = map.name;
		furniture.addEffect("invisibility", 10, { showParticles: false });
		block.setPermutation(block.permutation.withState("medieval:placed", true));
	}
}