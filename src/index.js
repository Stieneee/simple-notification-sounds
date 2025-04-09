import { success as successSound } from "./sounds/success.js";
import { attention as attentionSound } from "./sounds/attention.js";
import { alert as alertSound } from "./sounds/alert.js";
import { warning as warningSound } from "./sounds/warning.js";
import { error as errorSound } from "./sounds/error.js";
import { ensureAudioContextStarted } from "./sounds/utils.js";

// Create consistently named functions that avoid conflicts with built-in browser functions
const playSuccess = successSound;
const playAttention = attentionSound;
const playAlert = alertSound;
const playWarning = warningSound;
const playError = errorSound;

const UMD = {
  playSuccess,
  playAttention,
  playAlert,
  playWarning,
  playError,
  ensureAudioContextStarted,
};

if (typeof window !== "undefined") {
  window.SimpleNotificationSounds = UMD;
}

export {
  playSuccess,
  playAttention,
  playAlert,
  playWarning,
  playError,
  ensureAudioContextStarted,
};
