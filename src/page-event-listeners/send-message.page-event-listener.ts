import { MESSAGE_TYPE, PAGE_EVENT } from '../constants';
import { getDocumentUrl, sendPageRuntimeEvent } from '../helpers';
import { SendTemplateResult, SendTemplateResultPageEvent, Template } from '../interfaces';
import { MainSendTemplateStrategyManager } from '../strategies';

export const sendTemplate = async (messageType: MESSAGE_TYPE, template: Template): Promise<void> => {
  const url = getDocumentUrl();
  const strategyManager = new MainSendTemplateStrategyManager();
  const strategy = strategyManager.getStrategy(url, messageType);
  if (!strategy) {
    return;
  }
  const sendResult = await strategy.send(template);
  processSendResult(sendResult);
};

const processSendResult = (sendResult: SendTemplateResult): void => {
  const event: SendTemplateResultPageEvent = {
    type: PAGE_EVENT.SEND_TEMPLATE_RESULT,
    result: sendResult,
  };
  sendPageRuntimeEvent(event);
};
