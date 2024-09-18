import { MESSAGE_TYPE } from '../../../constants';
import { isTelegramAVerionUrl, isTelegramKVerionUrl } from '../../../helpers';
import { SendTemplateStrategy, SendTemplateStrategyManager } from '../../../interfaces';
import {
  ChatTelegramAVersionReceivePageInfoStrategy,
  ChatTelegramKVersionReceivePageInfoStrategy,
} from '../../receive-page-info.strategies';
import {
  ConnectTenegramSendTemplateStrategy,
  SendTenegramAWersionSendTemplateStrategy,
  SendTenegramKWersionSendTemplateStrategy,
} from '../../send-template.strategies';

export class TelegramSendTemplateStrategyManager implements SendTemplateStrategyManager {
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
    if (isTelegramAVerionUrl(url)) {
      const chatTelegramAVersionReceivePageInfoStrategy = new ChatTelegramAVersionReceivePageInfoStrategy();
      return new SendTenegramAWersionSendTemplateStrategy(chatTelegramAVersionReceivePageInfoStrategy);
    } else if (isTelegramKVerionUrl(url)) {
      const chatTelegramKVersionReceivePageInfoStrategy = new ChatTelegramKVersionReceivePageInfoStrategy();
      return new SendTenegramKWersionSendTemplateStrategy(chatTelegramKVersionReceivePageInfoStrategy);
    }
    return null;
  }

  private getConnectStrategy(): SendTemplateStrategy {
    return new ConnectTenegramSendTemplateStrategy();
  }
}
