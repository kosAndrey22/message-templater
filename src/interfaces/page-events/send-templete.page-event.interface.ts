import { MESSAGE_TYPE } from '../../constants';
import { Template } from '../template.interface';
import { BasePageEvent } from './base.page-event.interface';

export interface SendTemplatePageEvent extends BasePageEvent {
  template: Template;
  messageType: MESSAGE_TYPE;
}
