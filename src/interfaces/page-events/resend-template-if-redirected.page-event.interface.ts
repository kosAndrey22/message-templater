import { PAGE_EVENT } from '../../constants';
import { BasePageEvent } from './base.page-event.interface';

export interface ResendTemplateIfRedirectedPageEvent<T extends BasePageEvent> extends BasePageEvent {
  type: PAGE_EVENT.RESEND_TEMPLATE_IF_REDIRECTED;
  event: T,
}
