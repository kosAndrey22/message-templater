import { MESSAGE_TYPE } from '../constants';
import { getDocumentUrl } from '../helpers';
import { Template } from '../interfaces';
import { SendTemplateStrategyManager } from '../strategies';

export const sendMessage = (messageType: MESSAGE_TYPE, template: Template): void => {
  const url = getDocumentUrl();
  const strategy = SendTemplateStrategyManager.getStrategy(url, messageType);
  if (!strategy) {
    return;
  }
  strategy.send(template);
};

