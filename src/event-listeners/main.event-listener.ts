import { PAGE_EVENT } from '../constants';
import { addPageEventListener } from '../helpers';
import { BasePageEvent, SendTemplatePageEvent } from '../interfaces';
import { sendMessage } from './send-message.event-listener';

const MainEventListener = <Event extends BasePageEvent>(event: Event): void => {
  if (isSendMessageEvent(event)) {
    sendMessage(event.messageType, event.template);
  }
};

const isSendMessageEvent = (event: BasePageEvent): event is SendTemplatePageEvent => {
  return event.type === PAGE_EVENT.SEND_MESSAGE;
};

addPageEventListener(MainEventListener);
