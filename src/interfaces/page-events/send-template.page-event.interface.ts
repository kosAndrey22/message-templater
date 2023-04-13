import { MESSAGE_TYPE, PAGE_EVENT } from '../../constants';
import { Template } from '../template.interfaces';
import { BasePageEvent } from './base.page-event.interface';

export interface SendTemplatePageEvent extends BasePageEvent {
  type: PAGE_EVENT.SEND_TEMPLATE;
  template: Template;
  messageType: MESSAGE_TYPE;
}
