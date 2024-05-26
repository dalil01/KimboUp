export class UTime {

	public static format(milliseconds: number) {
		const totalSeconds = Math.floor(milliseconds / 1000);

		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const ms =  Math.floor((milliseconds % 1000) / 10);

		return `${ minutes.toString().padStart(2, '0') }:${ seconds.toString().padStart(2, '0') }:${ms.toString().padStart(2, '0')}`;
	}

}