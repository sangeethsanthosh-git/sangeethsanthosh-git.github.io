// Web Audio API synthesizer for Rewind and phone haptic clicks
// Zero external files, 100% browser-native, instant playback

let audioCtx: AudioContext | null = null;
let activeInterval: NodeJS.Timeout | null = null;
let isPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a pleasant subtle UI click/haptic sound
export function playHapticClick(volume = 0.08) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

// Lo-Fi Synth Chord Arpeggiator for Rewind Cassette Player
const CHORD_NOTES: number[][] = [
  // Cmaj7 (C4, E4, G4, B4)
  [261.63, 329.63, 392.0, 493.88],
  // Am7 (A3, C4, E4, G4)
  [220.0, 261.63, 329.63, 392.0],
  // Fmaj7 (F3, A3, C4, E4)
  [174.61, 220.0, 261.63, 329.63],
  // G7 (G3, B3, D4, F4)
  [196.0, 246.94, 293.66, 349.23],
];

export function startLoFiSynth(onBeat?: (noteIdx: number) => void) {
  if (isPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isPlaying = true;
  let chordIndex = 0;
  let noteIndex = 0;

  activeInterval = setInterval(() => {
    if (!isPlaying || !audioCtx) return;

    const chord = CHORD_NOTES[chordIndex];
    const freq = chord[noteIndex];

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      // Warm analog lowpass filter
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(850, audioCtx.currentTime);

      // Slightly warm triangle wave with slight tape detuning
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.065, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.42);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);

      if (onBeat) onBeat(noteIndex);
    } catch {
      // Ignore audio errors
    }

    noteIndex = (noteIndex + 1) % 4;
    if (noteIndex === 0) {
      chordIndex = (chordIndex + 1) % CHORD_NOTES.length;
    }
  }, 260);
}

export function stopLoFiSynth() {
  isPlaying = false;
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}
