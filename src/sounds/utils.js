import * as Tone from "tone";
import { getContext } from "tone";

let audioContextStarted = false;

export async function ensureAudioContextStarted() {
  const context = getContext();
  if (!audioContextStarted && context.state !== "running") {
    if (context.state === "suspended") {
      await context.resume();
    }
    if (context.state !== "running") {
      await Tone.start();
    }
    audioContextStarted = true;
    console.log("Audio Context started.");
  }
}

export function createSynth(options = {}) {
  const synthOptions = {
    oscillator: { type: "triangle", ...options.oscillator },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 0.5,
      ...options.envelope,
    },
    volume: -10,
    ...options,
  };
  const synth = new Tone.Synth(synthOptions).toDestination();

  // Store the creation time and envelope details for disposal management
  synth.createdAt = Tone.now();
  synth.totalDuration = 0; // Will be updated when played

  return synth;
}

export function createNoiseSynth(options = {}) {
  const noiseOptions = {
    noise: { type: "white", ...options.noise },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.05,
      release: 0.1,
      ...options.envelope,
    },
    volume: -15,
    ...options,
  };
  const noiseSynth = new Tone.NoiseSynth(noiseOptions).toDestination();

  // Store the creation time and envelope details for disposal management
  noiseSynth.createdAt = Tone.now();
  noiseSynth.totalDuration = 0; // Will be updated when played

  return noiseSynth;
}

// Helper function to safely dispose of a synth after it's done playing
export function disposeSynthAfterPlay(synth, totalDuration = 0) {
  // Calculate reasonable disposal time based on total duration and release time
  const releaseTime = synth.envelope
    ? Tone.Time(synth.envelope.release).toSeconds()
    : 0.5;
  const safetyBuffer = 1; // Added safety buffer in seconds

  // Use the longer of totalDuration or release time plus safety buffer
  const disposalDelay = Math.max(totalDuration, releaseTime) + safetyBuffer;

  // Schedule disposal
  setTimeout(() => {
    if (synth && !synth.disposed) {
      synth.dispose();
    }
  }, disposalDelay * 1000);
}

export function playSequence(instrument, notes, duration, interval) {
  ensureAudioContextStarted().then(() => {
    const now = Tone.now();
    let lastNoteTime = 0;
    notes.forEach((note, index) => {
      const startTime = now + index * Tone.Time(interval).toSeconds();
      instrument.triggerAttackRelease(note, duration, startTime);
      lastNoteTime = startTime + Tone.Time(duration).toSeconds();
    });

    // Calculate total duration from start to end of sequence
    const totalDuration =
      lastNoteTime - now + Tone.Time(instrument.envelope.release).toSeconds();
    instrument.totalDuration = totalDuration;

    // Safely dispose after total sequence time plus release time plus safety buffer
    disposeSynthAfterPlay(instrument, totalDuration);

    // Start transport if needed
    const transport = Tone.getTransport();
    if (transport.state !== "started") {
      transport.start();
    }
  });
}
