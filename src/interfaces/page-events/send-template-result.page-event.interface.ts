import { PAGE_EVENT } from '../../constants';
import { SendTemplateResult } from '../send-template-strategy.interfaces';
import { BasePageEvent } from './base.page-event.interface';

export interface SendTemplateResultPageEvent extends BasePageEvent {
  type: PAGE_EVENT.SEND_TEMPLATE_RESULT;
  result: SendTemplateResult;
}
