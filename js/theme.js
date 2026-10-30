/** Theme handling: light / dark with localStorage + system sync. */
import { icons } from "./icons.js";

const STORAGE_KEY = "theme";

let audioContext;

/** Soft two-note chime + tiny switch tick — bright for light, warm for dark. */
function playThemeSound(theme) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    audioContext ??= new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume();

    const now = audioContext.currentTime;
    const master = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.06, now + 0.012);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.value = 0.6;

    master.connect(filter);
    filter.connect(audioContext.destination);

    // A soft root note plus a quiet fifth above it.
    const notes = theme === "dark" ? [392, 587.33] : [659.25, 987.77];
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(index === 0 ? 0.9 : 0.2, now);

      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 0.28);
    });

    // A very short filtered noise tick gives the switch a tactile feel.
    const tick = audioContext.createBufferSource();
    const tickLength = Math.ceil(audioContext.sampleRate * 0.012);
    const buffer = audioContext.createBuffer(1, tickLength, audioContext.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) {
      samples[i] = (Math.random() * 2 - 1) * (1 - i / samples.length);
    }

    const tickFilter = audioContext.createBiquadFilter();
    const tickGain = audioContext.createGain();
    tickFilter.type = "highpass";
    tickFilter.frequency.setValueAtTime(1800, now);
    tickGain.gain.setValueAtTime(0.03, now);
    tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    tick.buffer = buffer;
    tick.connect(tickFilter);
    tickFilter.connect(tickGain);
    tickGain.connect(audioContext.destination);
    tick.start(now);
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
