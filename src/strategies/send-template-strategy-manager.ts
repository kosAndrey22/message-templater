import { MESSAGE_TYPE } from '../constants';
import { SendTemplateStrategy } from '../interfaces';
import { MockReceivePageInfoStrategy } from './receive-page-info.strategies';
import { LinkedinSendTemplateStrategy } from './send-template.strategies';

export class SendTemplateStrategyManager {

  static getStrategy(url: string, messageType: MESSAGE_TYPE): SendTemplateStrategy | null {
    if (SendTemplateStrategyManager.isLinkedinProfilePageUrl(url)) {
      return SendTemplateStrategyManager.getLinkedinStrategy(messageType);
    }
    return null;
  }

  private static isLinkedinProfilePageUrl(url: string): boolean {
    return !!url.match(/^https:\/\/www.linkedin.com\/in\/\w{1,}\/$/);
  }

  private static getLinkedinStrategy(messageType: MESSAGE_TYPE): SendTemplateStrategy | null {
    const pageInfoReceiveStrategy = new MockReceivePageInfoStrategy();
    switch (messageType) {
    case MESSAGE_TYPE.NORMAL_MESSAGE:
      return new LinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    case MESSAGE_TYPE.CONNECT_MESSAGE:
      return null;
    default:
      return null;
    }
  }
}
