import * as Tone from "tone";
import {
  createSynth,
  ensureAudioContextStarted,
  disposeSynthAfterPlay,
} from "./utils.js";

function playSuccessSound(type = "medium") {
  ensureAudioContextStarted().then(() => {
    // Using a bright, harmonically rich synth for positive sound
    const synth = createSynth({
      oscillator: { type: "triangle8" }, // Rich but gentle harmonics
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
      volume: -8,
    });

    // For success sounds, use upbeat patterns that are immediately recognizable as positive
    if (type === "short") {
      // Simple confirmation "beep" - standard scan success
      const now = Tone.now();
      synth.triggerAttackRelease("C5", "16n", now);
      disposeSynthAfterPlay(synth, 0.5);
    } else if (type === "medium") {
      // "Item processed" - classic success pattern
      const now = Tone.now();
      synth.triggerAttackRelease("C5", "16n", now);
      synth.triggerAttackRelease("E5", "8n", now + 0.15);
      disposeSynthAfterPlay(synth, 0.65);
    } else if (type === "long") {
      // "Process complete" - distinctive completion pattern
      // Uses ascending major triad with final resolution - universally recognized as "complete"
      const now = Tone.now();

      // Calculate total duration for proper disposal
      const totalDuration = 2.0; // Based on the last note time + release

      // Create a second synth for harmony effect
      const harmonySynth = createSynth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 0.6 },
        volume: -15,
      });

      // Main melody
      synth.triggerAttackRelease("C5", "8n", now);
      synth.triggerAttackRelease("E5", "8n", now + 0.2);
      synth.triggerAttackRelease("G5", "8n", now + 0.4);
      synth.triggerAttackRelease("C6", "4n", now + 0.7);

      // Harmony notes
      harmonySynth.triggerAttackRelease("E4", "8n", now + 0.4);
      harmonySynth.triggerAttackRelease("G4", "8n", now + 0.6);
      harmonySynth.triggerAttackRelease("C5", "4n", now + 0.7);

      // Ensure both synths are disposed after the pattern completes
      disposeSynthAfterPlay(synth, totalDuration);
      disposeSynthAfterPlay(harmonySynth, totalDuration);
    }
  });
}

export const success = playSuccessSound;
