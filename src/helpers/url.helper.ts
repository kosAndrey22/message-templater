import { LINKEDIN_HOST, TELEGRAM_HOST } from '../constants';

export const isLinkedinUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { host } = parsedUrl;
    const hostMatch = host === LINKEDIN_HOST;
    return hostMatch;
  } catch {
    return false;
  }
};

export const isLinkedinRecruiterLitePageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { pathname } = parsedUrl;
    const hostMatch = isLinkedinUrl(url);
    const pathMatch = !!pathname.match(/^\/talent\/profile\/.{1,}/);
    return hostMatch && pathMatch;
  } catch {
    return false;
  }
};

export const isLinkedinProfilePageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { pathname } = parsedUrl;
    const hostMatch = isLinkedinUrl(url);
    const pathMatch = !!pathname.match(/^\/in\/.{1,}/);
    return hostMatch && pathMatch;
  } catch {
    return false;
  }
};

export const isLinkedinPrivateMessagesPageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { pathname } = parsedUrl;
    const hostMatch = isLinkedinUrl(url);
    const pathMatch = !!pathname.match(/^\/messaging\/thread\/.{1,}/);
    return hostMatch && pathMatch;
  } catch {
    return false;
  }
};

export const isTelegramUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { host } = parsedUrl;
    const hostMatch = host === TELEGRAM_HOST;
    return hostMatch;
  } catch {
    return false;
  }
};

export const isTelegramAVerionUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { pathname } = parsedUrl;
    const hostMatch = isTelegramUrl(url);
    const pathMatch = !!pathname.match(/^\/a\/.{0,}/);
    return hostMatch && pathMatch;
  } catch {
    return false;
  }
};

export const isTelegramKVerionUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const { pathname } = parsedUrl;
    const hostMatch = isTelegramUrl(url);
    const pathMatch = !!pathname.match(/^\/k\/.{0,}/);
    return hostMatch && pathMatch;
  } catch {
    return false;
  }
};
