import { addPageEventListener, isSendTemplateEvent } from '../helpers';
import { BasePageEvent } from '../interfaces';
import { sendTemplate } from './send-message.page-event-listener';

const MainEventListener = <Event extends BasePageEvent>(event: Event): void => {
  if (isSendTemplateEvent(event)) {
    sendTemplate(event.messageType, event.template);
  }
};

addPageEventListener(MainEventListener);
