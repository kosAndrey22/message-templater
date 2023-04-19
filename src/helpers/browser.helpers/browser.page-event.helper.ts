import { BasePageEvent } from '../../interfaces';

type EventListener = (
  request: any,
  sender?: chrome.runtime.MessageSender,
  sendResponse?: (response: any) => void,
) => void;

export const addPageEventListener = (func: EventListener): void => {
  chrome.runtime.onMessage.addListener(func);
};

export const removePageEventListener = (func: EventListener): void => {
  chrome.runtime.onMessage.removeListener(func);
};
export const sendPageRuntimeEvent = <Event extends BasePageEvent>(event: Event): void => {
  chrome.runtime.sendMessage(event);
};
