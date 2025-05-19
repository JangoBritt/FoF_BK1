function SitOn(e, entityType, yOffset) {
	const player = e.player;
	const block = e.block;
	if (e.dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === entityType)) return;
	const chairEntity = e.dimension.spawnEntity(entityType, {x: block.x + 0.5, y: block.y + yOffset, z: block.z + 0.5});
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	chairEntity.setRotation({x: 0, y: { north: 0, south: 180, east: 90, west: -90 }[direction]});
	chairEntity.getComponent("rideable").addRider(player);
};
export class MrSit {
	onPlayerInteract(e) {
		SitOn(e, "mr:chair_entity", 0.5);
	}
}