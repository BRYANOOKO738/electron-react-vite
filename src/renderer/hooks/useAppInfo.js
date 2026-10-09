import { useEffect, useState } from 'react';

// Loads the app's name, version and platform from the main process.
// Returns null until the answer arrives.
export function useAppInfo() {
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    let cancelled = false;
    window.electronApp
      ?.getAppInfo()
      .then((info) => {
        if (!cancelled) setAppInfo(info);
      })
      .catch((error) => console.error('Could not load app info:', error));
    return () => {
      cancelled = true;
    };
  }, []);

  return appInfo;
}
