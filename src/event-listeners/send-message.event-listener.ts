import { MESSAGE_TYPE } from '../constants';
import { HTMLElementNotFoundError } from '../errors';
import { getDocumentUrl } from '../helpers';
import { Template } from '../interfaces';
import { SendTemplateStrategyManager } from '../strategies';

export const sendMessage = async (messageType: MESSAGE_TYPE, template: Template): Promise<void> => {
  const url = getDocumentUrl();
  const strategy = SendTemplateStrategyManager.getStrategy(url, messageType);
  if (!strategy) {
    return;
  }
  try {
    await strategy.send(template);
  } catch (e) {
    if (e instanceof HTMLElementNotFoundError) {
      processHTMLElementNotFoundError(e);
    } else {
      processUnknownError(e);
    }
  }
};

const processHTMLElementNotFoundError = (e: HTMLElementNotFoundError): void => {
  console.error(e.message);
};

const processUnknownError = (e: unknown): void => {
  throw e;
};
