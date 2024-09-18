import { MESSAGE_TYPE } from '../../../constants';
import {
  isLinkedinPrivateMessagesPageUrl,
  isLinkedinProfilePageUrl,
  isLinkedinRecruiterLitePageUrl,
} from '../../../helpers';
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
  OpenDialogsLinkedinSendTemplateStrategy,
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
    if (isLinkedinProfilePageUrl(url)) {
      const pageInfoReceiveStrategy = new ProfileLinkedinReceivePageInfoStrategy();
      return new SendLinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    } else if (isLinkedinPrivateMessagesPageUrl(url)) {
      const pageInfoReceiveStrategy = new PrivateMessagesLinkedinReceivePageInfoStrategy();
      return new PrivateMessageLinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    } else if (isLinkedinRecruiterLitePageUrl(url)) {
      const pageInfoReceiveStrategy = new RecruiterLiteLinkedinReceivePageInfoStrategy();
      return new RecruiterLiteLinkedinSendTemplateStrategy(pageInfoReceiveStrategy);
    } else {
      return new OpenDialogsLinkedinSendTemplateStrategy();
    }
  }

  private getConnectStrategy(): SendTemplateStrategy {
    const pageInfoReceiveStrategy = new ProfileLinkedinReceivePageInfoStrategy();
    return new ConnectLinkedinConnectSendTemplateStrategy(pageInfoReceiveStrategy);
  }
}
