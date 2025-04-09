import * as Tone from "tone";
import {
  createSynth,
  ensureAudioContextStarted,
  createNoiseSynth,
  disposeSynthAfterPlay,
} from "./utils.js";

function playAttentionSound(type = "medium") {
  ensureAudioContextStarted().then(() => {
    // Using a hybrid tone that cuts through background noise
    const synth = createSynth({
      oscillator: { type: "sine4" }, // Adding harmonics for better perception
      envelope: { attack: 0.03, decay: 0.3, sustain: 0.2, release: 0.4 },
      volume: -8,
    });

    // For attention sounds, use patterns that are distinct from alerts but still catch attention
    if (type === "short") {
      // "Check this" - quick attention grabber
      synth.triggerAttackRelease("G4", "8n", Tone.now());
      disposeSynthAfterPlay(synth, 0.5);
    } else if (type === "medium") {
      // "Look here" - two-tone signal for inspection needed
      const now = Tone.now();
      synth.triggerAttackRelease("G4", "8n", now);
      synth.triggerAttackRelease("C5", "8n", now + 0.25);
      disposeSynthAfterPlay(synth, 0.75);
    } else if (type === "long") {
      // "Pay special attention" - distinctive scanning pattern
      // Uses ascending-descending pattern like a scanner sweep
      const now = Tone.now();
      const notes = ["G4", "A4", "C5", "E5", "G5", "E5", "C5", "A4", "G4"];
      const interval = 0.12; // Quick enough to be a single sound event

      // Calculate total duration for proper disposal
      const totalDuration = notes.length * interval + 1.2; // Add extra time for the noise effect

      notes.forEach((note, index) => {
        synth.triggerAttackRelease(note, "16n", now + index * interval);
      });

      // Add a subtle noise sweep for a "scanner" effect
      const noiseSynth = createNoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.01, decay: 1.2, sustain: 0, release: 0.2 },
        volume: -30,
      });
      noiseSynth.triggerAttackRelease("8n", now);

      // Ensure both synths are disposed after the pattern completes
      disposeSynthAfterPlay(synth, totalDuration);
      disposeSynthAfterPlay(noiseSynth, totalDuration);
    }
  });
}

export const attention = playAttentionSound;
