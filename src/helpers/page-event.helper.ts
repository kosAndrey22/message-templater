import { BasePageEvent } from '../interfaces';

export const sendPageEvent = <Event extends BasePageEvent>(event: Event): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, event);
  });
};
