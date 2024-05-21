export class UGame {

	public static findDirectionOffset({ forward, backward, leftward, rightward }: any): number {
		let directionOffset = 0;

		if (forward) {
			if (leftward) {
				directionOffset = -Math.PI * 3 / 4;
			} else if (rightward) {
				directionOffset = Math.PI * 3 / 4;
			} else {
				directionOffset = -Math.PI;
			}
		} else if (backward) {
			if (leftward) {
				directionOffset = -Math.PI / 4;
			} else if (rightward) {
				directionOffset = Math.PI / 4;
			}
		} else if (leftward) {
			directionOffset = -Math.PI / 2;
		} else if (rightward) {
			directionOffset = Math.PI / 2;
		}

		return directionOffset;
	}

}