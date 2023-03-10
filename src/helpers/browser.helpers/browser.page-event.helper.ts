import { BasePageEvent } from '../../interfaces';
import { getActiveTab } from './browser.tab.helper';

type EventListener = ((request: any, sender?: chrome.runtime.MessageSender, sendResponse?: (response: any) => void) => void);

export const addPageEventListener = (func: EventListener): void => {
  chrome.runtime.onMessage.addListener(func);
};

export const sendPageEvent = async <Event extends BasePageEvent>(event: Event): Promise<void> => {
  const activeTab = await getActiveTab();
  chrome.tabs.sendMessage(activeTab.id, event);
};
