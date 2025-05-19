export class MrRockPath {
	beforeOnPlayerPlace(e) {
		e.permutationToPlace = e.permutationToPlace
			.withState("mr:direction", Math.floor(Math.random() * 4))
			.withState("mr:pattern", Math.floor(Math.random() * 4));
	}
}