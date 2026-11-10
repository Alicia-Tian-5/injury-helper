// The home page card that explains how to put the site on the phone's home
// screen, so it opens like an app and works offline (sw.js).

var INSTALL_DISMISSED_KEY = 'injury-helper-install-dismissed';

// Which help to show:
//   none    → already opened from the home screen, dismissed, or a computer
//   prompt  → the browser can install it with one button (Android Chrome)
//   ios     → Share, then "Add to Home Screen" (iPhone and iPad have no button)
//   android → the browser menu, then "Add to Home screen"
function installHelp(device) {
  if (device.standalone || device.dismissed) return 'none';
  if (device.canPrompt) return 'prompt';
  if (device.ios) return 'ios';
  if (device.android) return 'android';
  return 'none';
}

function isIosDevice(userAgent, platform, touchPoints) {
  // iPads ask for desktop pages and call themselves a Mac, but have touch.
  return /iPhone|iPad|iPod/.test(userAgent) || (platform === 'MacIntel' && touchPoints > 1);
}
