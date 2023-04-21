import { MESSAGE_TYPE } from '../../../constants';
import { isLinkedinUrl } from '../../../helpers';
import { SendTemplateStrategy, SendTemplateStrategyManager } from '../../../interfaces';
import {
  PrivateMessagesLinkedinReceivePageInfoStrategy,
  ProfileLinkedinReceivePageInfoStrategy,
  RecruiterLiteLinkedinReceivePageInfoStrategy,
} from '../../receive-page-info.strategies';
import {
  SendLinkedinSendTemplateStrategy,
  ConnectLinkedinConnectSendTemplateStrategy,
  PrivateMessageLinkedinSendTemplateStrategy,
  RecruiterLiteLinkedinSendTemplateStrategy,
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
    } else if (this.isLinkedinPrivateMessagesPageUrl(url)) {
      const pageInfoReceiveStrategy = new PrivateMessagesLinkedinReceivePageInfoStrategy();
      return new PrivateMessageLinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    } else if (this.isLinkedinRecruiterLitePageUrl(url)) {
      const pageInfoReceiveStrategy = new RecruiterLiteLinkedinReceivePageInfoStrategy();
      return new RecruiterLiteLinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    } else {
      return null;
    }
  }

  private getConnectStrategy(): SendTemplateStrategy {
    const pageInfoReceiveStrategy = new ProfileLinkedinReceivePageInfoStrategy();
    return new ConnectLinkedinConnectSendTemplateStrategy(pageInfoReceiveStrategy);
  }

  private isLinkedinRecruiterLitePageUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const { pathname } = parsedUrl;
      const hostMatch = isLinkedinUrl(url);
      const pathMatch = !!pathname.match(/^\/talent\/profile\/.{1,}/);
      return hostMatch && pathMatch;
    } catch {
      return false;
    }
  }

  private isLinkedinProfilePageUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const { pathname } = parsedUrl;
      const hostMatch = isLinkedinUrl(url);
      const pathMatch = !!pathname.match(/^\/in\/.{1,}/);
      return hostMatch && pathMatch;
    } catch {
      return false;
    }
  }

  private isLinkedinPrivateMessagesPageUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const { pathname } = parsedUrl;
      const hostMatch = isLinkedinUrl(url);
      const pathMatch = !!pathname.match(/^\/messaging\/thread\/.{1,}/);
      return hostMatch && pathMatch;
    } catch {
      return false;
    }
  }
}
