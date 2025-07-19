export class MfCarpetConnection {
	onPlace(e) {
		updateCarpetConnections(e.block);
		checkAdjacentCarpet(e.block);
	}
	onPlayerDestroy(e) { checkAdjacentCarpet(e.block); }
}
function updateCarpetConnections(block) {
	let permutation = block.permutation;
	const neighbors = {"medieval:n": block.north(),"medieval:s": block.south(),"medieval:w": block.west(),"medieval:e": block.east()};
	for (const state in neighbors) {
		const neighbor = neighbors[state];
		permutation = permutation.withState(state, neighbor.hasTag("mf:carpet_diamond"));
	}
	block.setPermutation(permutation);
}
function checkAdjacentCarpet(block) {
	const neighbors = [block.north(), block.south(), block.west(), block.east()];
	for (const neighbor of neighbors) {
		if (neighbor?.hasTag("mf:carpet_diamond")) updateCarpetConnections(neighbor);
	}
}