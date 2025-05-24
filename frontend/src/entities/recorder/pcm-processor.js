class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0][0]; // inputs[0][0]
    if (!input) return true;

    const pcmInt16 = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const sample = Math.max(-1, Math.min(1, input[i]));
      pcmInt16[i] = sample < 0 ? sample * 32768 : sample * 32767;
    }

    this.port.postMessage(pcmInt16.buffer, [pcmInt16.buffer]);
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);