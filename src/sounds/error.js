import * as Tone from "tone";
import {
  createSynth,
  ensureAudioContextStarted,
  disposeSynthAfterPlay,
} from "./utils.js";

function playErrorSound(type = "medium") {
  ensureAudioContextStarted().then(() => {
    // Using a harsh, buzzy synth for clear error indication
    const synth = createSynth({
      oscillator: { type: "fmsquare" }, // FM square has a digital, buzzy quality
      envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.2 },
      volume: -9,
    });

    if (type === "short") {
      // Quick error indication - single buzz
      const now = Tone.now();
      synth.triggerAttackRelease("Eb4", "8n", now);
      disposeSynthAfterPlay(synth, 0.5);
    } else if (type === "medium") {
      // Standard error - descending minor second interval (dissonant)
      const now = Tone.now();
      synth.triggerAttackRelease("Eb4", "8n", now);
      synth.triggerAttackRelease("D4", "8n", now + 0.2);
      disposeSynthAfterPlay(synth, 0.7);
    } else if (type === "long") {
      // Critical error - distinctive "error" pattern with chromatic descent
      const now = Tone.now();

      // Calculate total duration for proper disposal
      const totalDuration = 2.0;

      // Create a second synth for layered effect
      const secondSynth = createSynth({
        oscillator: { type: "square" },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 0.3 },
        volume: -12,
      });

      // Main error pattern - deliberately dissonant
      synth.triggerAttackRelease("Eb4", "8n", now);
      synth.triggerAttackRelease("D4", "8n", now + 0.25);
      synth.triggerAttackRelease("Eb4", "8n", now + 0.5);
      synth.triggerAttackRelease("D4", "8n", now + 0.75);

      // Final longer error tone
      synth.triggerAttackRelease("Bb3", "4n", now + 1.1);

      // Low frequency background tone to add urgency
      secondSynth.triggerAttackRelease("Eb3", "2n", now);

      // Ensure both synths are disposed after the pattern completes
      disposeSynthAfterPlay(synth, totalDuration);
      disposeSynthAfterPlay(secondSynth, totalDuration);
    }
  });
}

export const error = playErrorSound;
