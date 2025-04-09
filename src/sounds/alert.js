// src/sounds/alert.js
import * as Tone from "tone";
import {
  createSynth,
  playSequence,
  ensureAudioContextStarted,
  disposeSynthAfterPlay,
} from "./utils.js";

function playAlertSound(type = "medium") {
  ensureAudioContextStarted().then(() => {
    // Using a brighter synth with more presence for alerts
    const synth = createSynth({
      oscillator: { type: "square8" }, // Using richer harmonics for better audibility
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
      volume: -10,
    });

    // For alerts, use patterns that demand immediate attention
    if (type === "short") {
      // Sharp single high note for quick, urgent notification
      synth.triggerAttackRelease("D5", "8n", Tone.now());
      disposeSynthAfterPlay(synth, 0.5);
    } else if (type === "medium") {
      // Repeated pattern creates urgency
      const now = Tone.now();
      synth.triggerAttackRelease("D5", "16n", now);
      synth.triggerAttackRelease("D5", "16n", now + 0.15);
      disposeSynthAfterPlay(synth, 0.5);
    } else if (type === "long") {
      // SOS-like pattern - universally recognized as urgent
      const notes = ["D5", "D5", "D5", "A4", "A4", "A4", "D5", "D5", "D5"];
      const durations = Array(9).fill("32n");
      const intervals = [
        "32n",
        "32n",
        "8n", // ... ... _
        "32n",
        "32n",
        "8n", // ... ... _
        "32n",
        "32n",
        "8n", // ... ... _
      ];

      let now = Tone.now();
      let lastNoteTime = now;

      // Calculate total duration for proper disposal timing
      let totalDuration = 0;
      for (let i = 0; i < intervals.length; i++) {
        totalDuration += Tone.Time(intervals[i]).toSeconds();
      }

      for (let i = 0; i < notes.length; i++) {
        synth.triggerAttackRelease(notes[i], durations[i], now);
        now += Tone.Time(intervals[i]).toSeconds();
        lastNoteTime = now;
      }

      // Ensure synth is disposed of after the entire pattern completes
      disposeSynthAfterPlay(synth, totalDuration);
    }
  });
}

export const alert = playAlertSound;
