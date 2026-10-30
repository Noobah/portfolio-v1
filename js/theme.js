/** Theme handling: light / dark with localStorage + system sync. */
import { icons } from "./icons.js";

const STORAGE_KEY = "theme";

let audioContext;
let noiseBuffer;

/** A short noise buffer used for the mechanical click transient. */
function getNoiseBuffer(ctx) {
  if (noiseBuffer) return noiseBuffer;

  const length = Math.ceil(ctx.sampleRate * 0.08);
  noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const samples = noiseBuffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) {
    samples[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

/** One physical-feeling click: sharp transient + short low thock. */
function playSwitchClick(ctx, destination, time, { click, body, gain }) {
  const noise = ctx.createBufferSource();
  const bandpass = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();

  noise.buffer = getNoiseBuffer(ctx);
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(click, time);
  bandpass.Q.setValueAtTime(0.9, time);
  noiseGain.gain.setValueAtTime(gain, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.028);

  noise.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(destination);
  noise.start(time);
  noise.stop(time + 0.04);

  const thock = ctx.createOscillator();
  const thockGain = ctx.createGain();
  thock.type = "triangle";
  thock.frequency.setValueAtTime(body * 1.7, time);
  thock.frequency.exponentialRampToValueAtTime(body, time + 0.025);
  thockGain.gain.setValueAtTime(0.0001, time);
  thockGain.gain.exponentialRampToValueAtTime(gain * 0.85, time + 0.004);
  thockGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);

  thock.connect(thockGain);
  thockGain.connect(destination);
  thock.start(time);
  thock.stop(time + 0.12);
}

/** A hard, real-world switch: press click, release clack, and a low body. */
function playThemeSound(theme) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    audioContext ??= new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume();

    const now = audioContext.currentTime;
    const compressor = audioContext.createDynamicsCompressor();
    const master = audioContext.createGain();

    compressor.threshold.setValueAtTime(-18, now);
    compressor.knee.setValueAtTime(8, now);
    compressor.ratio.setValueAtTime(10, now);
    compressor.attack.setValueAtTime(0.001, now);
    compressor.release.setValueAtTime(0.09, now);

    master.gain.setValueAtTime(0.75, now);
    master.connect(compressor);
    compressor.connect(audioContext.destination);

    const light = theme === "light";
    const first = {
      click: light ? 3100 : 2500,
      body: light ? 190 : 150,
      gain: 0.5,
    };
    const second = {
      click: light ? 3900 : 3200,
      body: light ? 160 : 125,
      gain: 0.36,
    };

    playSwitchClick(audioContext, master, now, first);
    playSwitchClick(audioContext, master, now + 0.055, second);
  } catch {
    /* audio is a nice-to-have; never block the theme switch */
  }
}

export function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

export function initThemeToggle(button) {
  const render = () => {
    button.innerHTML = getTheme() === "dark" ? icons.sun : icons.moon;
  };

  button.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    setTheme(next);
    playThemeSound(next);
  });

  window.addEventListener("themechange", render);
  render();
}
