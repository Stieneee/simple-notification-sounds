/**
 * Simple Notification Sounds - TypeScript definitions
 * A lightweight, flexible library for adding meaningful audio cues to web applications.
 */

/**
 * Sound duration type
 * - 'short': Quick, brief notification sound
 * - 'medium': Standard length notification sound (default)
 * - 'long': Extended, more complex notification sound
 */
export type SoundDuration = "short" | "medium" | "long";

/**
 * Plays a success sound.
 * Success sounds use bright, harmonically rich tones with upward musical patterns
 * that are universally recognized as positive.
 *
 * @param duration - Controls the length and complexity of the sound
 * - 'short': Simple confirmation beep for quick acknowledgment
 * - 'medium': Two-note rising pattern for confirming task completion (default)
 * - 'long': Complete major chord progression with harmonies for complex process completion
 *
 * @example
 * // Play the default (medium) success sound
 * playSuccess();
 *
 * // Play a short success sound
 * playSuccess('short');
 *
 * // Play a long success sound
 * playSuccess('long');
 */
export function playSuccess(duration?: SoundDuration): void;

/**
 * Plays an attention sound.
 * Attention sounds use clear, focused tones designed to gently draw
 * the user's focus without urgency.
 *
 * @param duration - Controls the length and complexity of the sound
 * - 'short': Single tone for subtle notifications
 * - 'medium': Two-tone pattern for moderate attention (default)
 * - 'long': Melodic sequence for sustained focus
 *
 * @example
 * // Play the default (medium) attention sound
 * playAttention();
 *
 * // Play a short attention sound
 * playAttention('short');
 */
export function playAttention(duration?: SoundDuration): void;

/**
 * Plays an alert sound.
 * Alert sounds use attention-grabbing tones designed to demand immediate focus,
 * with patterns that cut through background noise.
 *
 * @param duration - Controls the length and complexity of the sound
 * - 'short': Sharp high note for quick, urgent notification
 * - 'medium': Repeated pattern that creates immediate urgency (default)
 * - 'long': SOS-like pattern that is universally recognized as requiring immediate attention
 *
 * @example
 * // Play the default (medium) alert sound
 * playAlert();
 *
 * // Play a long alert sound
 * playAlert('long');
 */
export function playAlert(duration?: SoundDuration): void;

/**
 * Plays a warning sound.
 * Warning sounds use slightly dissonant tones that indicate caution
 * without the full urgency of alerts.
 *
 * @param duration - Controls the length and complexity of the sound
 * - 'short': Quick caution indicator for minor issues
 * - 'medium': Classic two-tone descending pattern that signals potential problems (default)
 * - 'long': Minor descending pattern with repetition that clearly communicates significant issues
 *
 * @example
 * // Play the default (medium) warning sound
 * playWarning();
 *
 * // Play a short warning sound
 * playWarning('short');
 */
export function playWarning(duration?: SoundDuration): void;

/**
 * Plays an error sound.
 * Error sounds use harsh, buzzy tones with dissonant intervals
 * that clearly indicate something is wrong.
 *
 * @param duration - Controls the length and complexity of the sound
 * - 'short': Single buzz tone for quick error indication
 * - 'medium': Dissonant descending interval that signals standard errors (default)
 * - 'long': Complex pattern with alternating dissonant tones and low-frequency
 *           background for critical failures
 *
 * @example
 * // Play the default (medium) error sound
 * playError();
 *
 * // Play a long error sound for critical failures
 * playError('long');
 */
export function playError(duration?: SoundDuration): void;

/**
 * Ensures the AudioContext is started.
 * This is automatically called by all sound functions, but can be called manually
 * in response to a user interaction to prepare the audio system for later use.
 *
 * @returns A promise that resolves when the AudioContext is started
 *
 * @example
 * // Prepare audio system on page load after user interaction
 * document.getElementById('startButton').addEventListener('click', () => {
 *   ensureAudioContextStarted().then(() => {
 *     console.log('Audio system ready');
 *   });
 * });
 */
export function ensureAudioContextStarted(): Promise<void>;

/**
 * SimpleNotificationSounds namespace for UMD/global usage
 */
declare global {
  interface Window {
    SimpleNotificationSounds: {
      playSuccess: typeof playSuccess;
      playAttention: typeof playAttention;
      playAlert: typeof playAlert;
      playWarning: typeof playWarning;
      playError: typeof playError;
      ensureAudioContextStarted: typeof ensureAudioContextStarted;
    };
  }
}
