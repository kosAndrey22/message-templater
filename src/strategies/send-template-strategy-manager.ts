import { LINKEDIN_HOST, MESSAGE_TYPE } from '../constants';
import { SendTemplateStrategy } from '../interfaces';
import { LinkedinReceivePageInfoStrategy } from './receive-page-info.strategies';
import { LinkedinConnectSendTemplateStrategy, LinkedinSendTemplateStrategy } from './send-template.strategies';

export class SendTemplateStrategyManager {

  static getStrategy(url: string, messageType: MESSAGE_TYPE): SendTemplateStrategy | null {
    if (SendTemplateStrategyManager.isLinkedinProfilePageUrl(url)) {
      return SendTemplateStrategyManager.getLinkedinStrategy(messageType);
    }
    return null;
  }

  private static isLinkedinProfilePageUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const { host, pathname } = parsedUrl;
      const hostMatch = host === LINKEDIN_HOST;
      const pathMatch = !!pathname.match(/^\/in\/.{1,}/);
      return hostMatch && pathMatch;
    } catch {
      return false;
    }
  }

  private static getLinkedinStrategy(messageType: MESSAGE_TYPE): SendTemplateStrategy | null {
    const pageInfoReceiveStrategy = new LinkedinReceivePageInfoStrategy();
    switch (messageType) {
    case MESSAGE_TYPE.NORMAL_MESSAGE:
      return new LinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    case MESSAGE_TYPE.CONNECT_MESSAGE:
      return new LinkedinConnectSendTemplateStrategy(pageInfoReceiveStrategy);;
    default:
      return null;
    }
  }
}
