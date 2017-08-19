export const randomButton = (buttonCount) =>
  Math.floor(Math.random() * buttonCount)

export const boolToBinary = arr => 
  parseInt(arr.map(e => e === true ? 1 : 0).join(''), 2)

const ctx = new (window.AudioContext ||
  window.webkitAudioContext)();

let osc = null;

export const playSound = (wave, freq, ms) => {
  osc = ctx.createOscillator();
  osc.type = wave;
  osc.frequency.value = freq;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + (ms / 1000));
}
