const isInRange = (value, min, max) => value >= min && value <= max;
export class SelectionBoxes {
	constructor(...boxes) {
		this.boxes = boxes;
	}
	getSelected(faceLocation, options) {
		let location = { ...faceLocation };
		if (!options?.invertX) location.x = 1 - location.x;
		if (options?.invertY) location.y = 1 - location.y;
		if (options?.invertZ) location.z = 1 - location.z;
		for (let i = 0; i < this.boxes.length; i++) {
			const box = this.boxes[i];
			const from = {
				x: box.origin[0] + 8,
				y: box.origin[1],
				z: box.origin[2] + 8,
			};
			const to = {
				x: from.x + box.size[0],
				y: from.y + box.size[1],
				z: from.z + box.size[2],
			};
			const inXRange = isInRange(location.x, from.x / 16, to.x / 16);
			const inYRange = isInRange(location.y, from.y / 16, to.y / 16);
			const inZRange = isInRange(location.z, from.z / 16, to.z / 16);
			if (inXRange && inYRange && inZRange) return box.name ?? i;
		}
	}
}
const getAxis = (direction) => direction === "west" || direction === "east" ? "z" : "x";
export function getArea(block, faceLocation, area) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const axis = getAxis(direction);
	let options = {};
	if (direction === "west") options = { invertZ: true }
	if (direction === "north") options = { invertX: true, invertZ: true }
	if (direction === "east") options = { invertX: true }
	return area[axis].getSelected(faceLocation, options);
}