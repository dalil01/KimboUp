export class UTime {

	public static format(milliseconds: number) {
		let totalSeconds = Math.floor(milliseconds / 1000);

		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;

		return `${ minutes.toString().padStart(2, '0') }:${ seconds.toString().padStart(2, '0') }`;
	}

}