export class MrUpdateCoffeeTable {
	onPlace(e) {
		updateTable(e.block, "mr:coffee_table");
		updateNearestTables(e.block, "mr:coffee_table");
	}
	onPlayerDestroy(e) {
		updateNearestTables(e.block, "mr:coffee_table");
	}
}
export class MrUpdateShortCoffeeTable {
	onPlace(e) {
		updateTable(e.block, "mr:short_coffee_table");
		updateNearestTables(e.block, "mr:short_coffee_table");
	}
	onPlayerDestroy(e) {
		updateNearestTables(e.block, "mr:short_coffee_table");
	}
}
export class MrUpdateTable {
	onPlace(e) {
		updateTable(e.block, "mr:table");
		updateNearestTables(e.block, "mr:table");
	}
	onPlayerDestroy(e) {
		updateNearestTables(e.block, "mr:table");
	}
}
export class MrUpdateTrampoline {
	onPlace(e) {
		updateTable(e.block, "mr:trampoline");
		updateNearestTables(e.block, "mr:trampoline");
	}
	onPlayerDestroy(e) {
		updateNearestTables(e.block, "mr:trampoline");
	}
}
function updateTable(block, tag) {
	const permutation = block.permutation
		.withState("mr:n", block.north()?.hasTag(tag) ? 1 : 0)
		.withState("mr:s", block.south()?.hasTag(tag) ? 1 : 0)
		.withState("mr:w", block.west()?.hasTag(tag) ? 1 : 0)
		.withState("mr:e", block.east()?.hasTag(tag) ? 1 : 0);
	block.setPermutation(permutation);
}
function updateNearestTables(block, tag) {
	if (block.north().hasTag(tag)) updateTable(block.north(), tag);
	if (block.south().hasTag(tag)) updateTable(block.south(), tag);
	if (block.west().hasTag(tag)) updateTable(block.west(), tag);
	if (block.east().hasTag(tag)) updateTable(block.east(), tag);
}