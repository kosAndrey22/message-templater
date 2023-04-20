import { LINKEDIN_HOST } from '../constants';

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
