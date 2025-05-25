class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.threshold = 500;
  }
  
  process(inputs) {
    const input = inputs[0][0];
    if (!input) return true;

    let max = 0;
    const buffer = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = input[i] * 32767;
      buffer[i] = s;
      max = Math.max(max, Math.abs(s));
    }

    if (max > this.threshold) {
      this.port.postMessage(buffer.buffer, [buffer.buffer]);
    }
    
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);