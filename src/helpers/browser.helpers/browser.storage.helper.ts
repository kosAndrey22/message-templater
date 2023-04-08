export const getFromBrowserStorage = async <T>(key: string): Promise<T | null> => {
  const res = await chrome.storage.local.get(key);
  return res[key];
};

export const setToBrowserStorage = async <T>(key: string, data: T): Promise<void> => {
  await chrome.storage.local.set({ [key]: data });
};
