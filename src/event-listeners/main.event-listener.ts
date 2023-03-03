import { PAGE_EVENT } from '../constants';
import { BasePageEvent, SendTemplatePageEvent } from '../interfaces';
import { sendMessage } from './send-message.event-listener';

chrome.runtime.onMessage.addListener(<Event extends BasePageEvent>(event: Event) => {
  if (isSendMessageEvent(event)) {
    sendMessage(event.messageType, event.template);
  }
});

const isSendMessageEvent = (event: BasePageEvent): event is SendTemplatePageEvent => {
  return event.type === PAGE_EVENT.SEND_MESSAGE;
};
