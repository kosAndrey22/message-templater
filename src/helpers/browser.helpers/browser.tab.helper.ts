import { PROCESS_PAGE_EVENT_ONCE_FILE } from '../../constants';
import { BasePageEvent } from '../../interfaces';

export const getActiveTab = async (): Promise<chrome.tabs.Tab> => {
  const activeTab: chrome.tabs.Tab = await new Promise((resolve) => {
    chrome.tabs.query({ active: true }, (tabs: chrome.tabs.Tab[]) => {
      resolve(tabs[0]);
    });
  });
  return activeTab;
};

export const getTabById = async (tabId: number): Promise<chrome.tabs.Tab> => {
  const tab = await chrome.tabs.get(tabId);
  return tab;
};

export const executeScriptOnTab = (tabId: number, scriptFile: string, cb?: () => any): void => {
  chrome.scripting.executeScript({ target: { tabId }, files: [scriptFile] }, cb);
};

export const executeScriptOnActiveTab = async (scriptFile: string, cb?: () => any): Promise<void> => {
  const activeTab = await getActiveTab();
  executeScriptOnTab(activeTab.id, scriptFile, cb);
};

export const sendPageEventToActiveTab = async <Event extends BasePageEvent>(event: Event): Promise<void> => {
  const activeTab = await getActiveTab();
  chrome.tabs.sendMessage(activeTab.id, event);
};

export const executeScriptOnActiveTabOnce = async <Event extends BasePageEvent>(event: Event): Promise<void> => {
  await executeScriptOnActiveTab(PROCESS_PAGE_EVENT_ONCE_FILE, () => {
    sendPageEventToActiveTab(event);
  });
};
