export const getActiveTab = async (): Promise<chrome.tabs.Tab> => {
  const activeTab: chrome.tabs.Tab = await new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      resolve(tabs[0]);
    });
  });
  return activeTab;
};

export const executeSriptOnTab = (tabId: number, scriptFile: string): void => {
  chrome.scripting.executeScript({ target: { tabId }, files: [scriptFile] });
};
