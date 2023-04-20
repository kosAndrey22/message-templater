import { LINKEDIN_HOST, MESSAGE_TYPE } from '../../../constants';
import { SendTemplateStrategy, SendTemplateStrategyManager } from '../../../interfaces';
import { ProfileLinkedinReceivePageInfoStrategy } from '../../receive-page-info.strategies';
import {
  SendLinkedinSendTemplateStrategy,
  ConnectLinkedinConnectSendTemplateStrategy,
} from '../../send-template.strategies';

export class LinkedinSendTemplateStrategyManager implements SendTemplateStrategyManager {
  public getStrategy(url: string, messageType: MESSAGE_TYPE): SendTemplateStrategy | null {
    switch (messageType) {
      case MESSAGE_TYPE.NORMAL_MESSAGE:
        return this.getSendStrategy(url);
      case MESSAGE_TYPE.CONNECT_MESSAGE:
        return this.getConnectStrategy();
      default:
        return null;
    }
  }

  private getSendStrategy(url: string): SendTemplateStrategy | null {
    if (this.isLinkedinProfilePageUrl(url)) {
      const pageInfoReceiveStrategy = new ProfileLinkedinReceivePageInfoStrategy();
      return new SendLinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    } else {
      return null;
    }
  }

  private getConnectStrategy(): SendTemplateStrategy {
    const pageInfoReceiveStrategy = new ProfileLinkedinReceivePageInfoStrategy();
    return new ConnectLinkedinConnectSendTemplateStrategy(pageInfoReceiveStrategy);
  }

  private isLinkedinProfilePageUrl(url: string): boolean {
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
}
