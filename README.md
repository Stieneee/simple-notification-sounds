# Simple Notification Sounds

A lightweight, flexible library for adding meaningful audio cues to web applications. This library provides distinct notification sounds that are designed to convey information even in environments where users may not be looking at the screen.

## Demo

🎮 [Try the interactive demo](https://unpkg.com/simple-notification-sounds@latest/demo.html) to hear all the different sounds!

## Installation

```bash
npm install simple-notification-sounds
```

## Usage

### ES Module

```javascript
import {
  playSuccess,
  playAttention,
  playAlert,
  playWarning,
  playError,
} from "simple-notification-sounds";

// Play a medium success sound (default)
playSuccess();

// Play a short attention sound
playAttention("short");

// Play a long warning sound
playWarning("long");
```

### UMD (Browser)

#### Via CDN (Recommended)

```html
<!-- From unpkg -->
<script src="https://unpkg.com/simple-notification-sounds@latest/dist/simple-notification-sounds.umd.js"></script>

<!-- OR from jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/simple-notification-sounds@latest/dist/simple-notification-sounds.umd.js"></script>

<script>
  // Play a medium attention sound (default)
  SimpleNotificationSounds.playAttention();

  // Play a short error sound
  SimpleNotificationSounds.playError("short");
</script>
```

#### Local File

```html
<script src="dist/simple-notification-sounds.umd.js"></script>
<script>
  // Play a medium attention sound (default)
  SimpleNotificationSounds.playAttention();

  // Play a short error sound
  SimpleNotificationSounds.playError("short");
</script>
```

## Sound Types and Use Cases

Each sound is carefully designed with distinctive audio characteristics to convey specific meanings without requiring visual confirmation.

### Success

Success sounds use bright, harmonically rich tones with upward musical patterns that are universally recognized as positive.

- **Short**: Simple confirmation beep - useful for quick acknowledgment of successful actions
- **Medium**: Two-note rising pattern - ideal for confirming task completion
- **Long**: Complete major chord progression with harmonies - perfect for signaling the completion of complex processes

**Real-world usage**: Scan completions, form submissions, transaction approvals, batch processing completions

### Attention

Attention sounds use clear, focused tones that are designed to gently draw the user's focus without urgency.

- **Short**: Single tone for subtle notifications
- **Medium**: Two-tone pattern for moderate attention
- **Long**: Melodic sequence for sustained focus

**Real-world usage**: Reminders, non-critical updates, user prompts, background notifications

### Alert

Alert sounds use attention-grabbing tones designed to demand immediate focus, with patterns that cut through background noise.

- **Short**: Sharp high note for quick, urgent notification
- **Medium**: Repeated pattern that creates immediate urgency
- **Long**: SOS-like pattern that is universally recognized as requiring immediate attention

**Real-world usage**: Critical system notifications, time-sensitive alerts, security warnings, emergency alerts

### Warning

Warning sounds use slightly dissonant tones that indicate caution without the full urgency of alerts.

- **Short**: Quick caution indicator for minor issues
- **Medium**: Classic two-tone descending pattern that signals potential problems
- **Long**: Minor descending pattern with repetition that clearly communicates significant issues

**Real-world usage**: Input validation errors, low battery/resources warnings, approaching thresholds, preventative notifications

### Error

Error sounds use harsh, buzzy tones with dissonant intervals that clearly indicate something is wrong.

- **Short**: Single buzz tone for quick error indication
- **Medium**: Dissonant descending interval that signals standard errors
- **Long**: Complex pattern with alternating dissonant tones and low-frequency background for critical failures

**Real-world usage**: Processing failures, authentication errors, system malfunctions, critical exceptions

## Design Philosophy

### Audio Design for Non-Visual Environments

The sounds in this library are specifically designed for scenarios where users may not be looking at the screen, such as:

- Inventory management and warehouse operations
- Manufacturing floors with equipment monitoring
- Healthcare environments where visual attention is focused elsewhere
- Accessibility applications for users with visual impairments

Each sound is carefully crafted with distinct timbres, musical patterns, and frequencies to ensure they remain distinguishable even in noisy environments.

### Bundle Size and Distribution Decision

This library uses a direct code approach rather than loading audio files or distributing through CDN for several key reasons:

1. **Minimal Dependencies**: No need for external audio files means no additional network requests
2. **Offline Capability**: All sounds work without internet connection once the library is loaded
3. **Customization**: Programmatically generated sounds can be easily modified for specific needs
4. **Size Efficiency**: The code-based approach results in a smaller total bundle size than equivalent audio files
5. **Cross-Browser Compatibility**: Uses the Web Audio API which has excellent browser support

While distributing pre-recorded audio files via CDN might have simplified implementation, the current approach offers superior flexibility, performance, and user experience, especially for applications that need to function in environments with limited connectivity.

However, for convenience, this library is published to npm and automatically available through unpkg and jsDelivr CDNs, allowing you to include it in your projects without installing via npm.

## Browser Compatibility

This library uses the Web Audio API and is compatible with all modern browsers:

- Chrome 49+
- Firefox 51+
- Safari 9.1+
- Edge 12+

## License

MIT
