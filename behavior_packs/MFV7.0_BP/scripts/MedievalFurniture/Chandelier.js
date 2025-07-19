export class MfHangingChandelier {
	beforeOnPlayerPlace(e) {
		if (e.face === "Up") e.permutationToPlace = e.permutationToPlace.withState("medieval:facing_direction", 1);
	}
}