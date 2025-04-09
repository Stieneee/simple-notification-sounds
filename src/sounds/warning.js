import * as Tone from "tone";
import {
  createSynth,
  createNoiseSynth,
  ensureAudioContextStarted,
  disposeSynthAfterPlay,
} from "./utils.js";

function playWarningSound(type = "medium") {
  ensureAudioContextStarted().then(() => {
    // Using a slightly dissonant synth for warning sounds
    const synth = createSynth({
      oscillator: { type: "sawtooth4" }, // Harsher timbre communicates caution
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.3 },
      volume: -12,
    });

    // For warning sounds, use patterns that indicate "caution" but not full emergency
    if (type === "short") {
      // "Check issue" - quick caution indicator
      const now = Tone.now();
      synth.triggerAttackRelease("F4", "8n", now);
      disposeSynthAfterPlay(synth, 0.5);
    } else if (type === "medium") {
      // "Potential problem" - classic warning pattern
      const now = Tone.now();
      synth.triggerAttackRelease("F4", "8n", now);
      synth.triggerAttackRelease("D4", "8n", now + 0.25);
      disposeSynthAfterPlay(synth, 0.75);
    } else if (type === "long") {
      // "Requires attention" - distinctive pattern for significant issues
      // Uses minor descending pattern with repetition for enhanced warning perception
      const now = Tone.now();

      // Calculate total duration for proper disposal (including the pause between patterns)
      const totalDuration = 2.5; // Covers the full pattern plus release time

      // Main warning pattern
      synth.triggerAttackRelease("F4", "8n", now);
      synth.triggerAttackRelease("D4", "8n", now + 0.25);
      synth.triggerAttackRelease("Bb3", "8n", now + 0.5);

      // Pause and repeat to emphasize warning
      synth.triggerAttackRelease("F4", "8n", now + 0.9);
      synth.triggerAttackRelease("D4", "8n", now + 1.15);
      synth.triggerAttackRelease("Bb3", "4n", now + 1.4);

      // Add subtle noise burst for attention
      const noiseSynth = createNoiseSynth({
        noise: { type: "pink" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
        volume: -25,
      });
      noiseSynth.triggerAttackRelease("16n", now);
      noiseSynth.triggerAttackRelease("16n", now + 0.9);

      // Ensure both synths are disposed after the pattern completes
      disposeSynthAfterPlay(synth, totalDuration);
      disposeSynthAfterPlay(noiseSynth, totalDuration);
    }
  });
}

export const warning = playWarningSound;
