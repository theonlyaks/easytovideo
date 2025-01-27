import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const MOBILE_REGEX = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i;
    setIsMobile(MOBILE_REGEX.test(window.navigator.userAgent));
  }, []);

  return isMobile;
};
