import { PAGE_EVENT } from '../constants';
import {
  BasePageEvent,
  ResendTemplateIfRedirectedPageEvent,
  SendTemplateResultPageEvent,
  SendTemplatePageEvent,
} from '../interfaces';

export const isSendTemplateEvent = (event: BasePageEvent): event is SendTemplatePageEvent => {
  return event.type === PAGE_EVENT.SEND_TEMPLATE;
};

export const isSendTemplateResultEvent = (event: BasePageEvent): event is SendTemplateResultPageEvent => {
  return event.type === PAGE_EVENT.SEND_TEMPLATE_RESULT;
};

export const isResendTemplateIfRedirectedEvent = (
  event: BasePageEvent,
): event is ResendTemplateIfRedirectedPageEvent<BasePageEvent> => {
  return event.type === PAGE_EVENT.RESEND_TEMPLATE_IF_REDIRECTED;
};
