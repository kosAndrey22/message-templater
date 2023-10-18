import { isSendTemplateEvent } from '../helpers';
import { BasePageEvent } from '../interfaces';
import { sendTemplate } from './send-message.page-event-listener';

export const mainEventListener = async <Event extends BasePageEvent>(event: Event): Promise<void> => {
  if (isSendTemplateEvent(event)) {
    await sendTemplate(event.messageType, event.template, event.resended);
  }
};
