import { MESSAGE_TYPE } from '../constants';
import { SendTemplateStrategy } from './send-template-strategy.interfaces';

export interface SendTemplateStrategyManager {
  getStrategy(url: string, messageType: MESSAGE_TYPE): SendTemplateStrategy | null;
}
