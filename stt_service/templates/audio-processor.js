class AudioProcessor extends AudioWorkletProcessor {
	constructor() {
		super();
	}

	process(inputs) {
		const input = inputs[0][0];
		if (!input) return true;

		const buffer = new Int16Array(input.length);
		for (let i = 0; i < input.length; i++) {
			buffer[i] = input[i] * 32767;
		}

		this.port.postMessage(buffer.buffer, [buffer.buffer]);

		return true;
	}
}

registerProcessor("audio-processor", AudioProcessor);

