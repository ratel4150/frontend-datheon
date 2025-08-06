
import { UAParser } from 'ua-parser-js';

export type DeviceData = {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: string;
  deviceModel: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
};

export const getDeviceData = (): DeviceData => {
  if (typeof window === 'undefined') {
    return {
      browser: 'Unknown',
      browserVersion: 'Unknown',
      os: 'Unknown',
      osVersion: 'Unknown',
      deviceType: 'Unknown',
      deviceModel: 'Unknown',
      screenWidth: 0,
      screenHeight: 0,
      language: 'Unknown'
    };
  }

  const parser = new UAParser(window.navigator.userAgent);
  const result = parser.getResult();

  return {
    browser: result.browser.name || 'Unknown',
    browserVersion: result.browser.version || 'Unknown',
    os: result.os.name || 'Unknown',
    osVersion: result.os.version || 'Unknown',
    deviceType: result.device.type || 'desktop',
    deviceModel: result.device.model || 'Unknown',
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language
  };
};