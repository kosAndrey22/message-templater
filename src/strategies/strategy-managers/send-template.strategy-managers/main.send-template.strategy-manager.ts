import { MESSAGE_TYPE } from '../../../constants';
import { isLinkedinUrl, isTelegramUrl } from '../../../helpers';
import { SendTemplateStrategy, SendTemplateStrategyManager } from '../../../interfaces';
import { LinkedinSendTemplateStrategyManager } from './linkedin.send-template.strategy-manager';
import { TelegramSendTemplateStrategyManager } from './telegram.send-template.strategy-manager';

export class MainSendTemplateStrategyManager implements SendTemplateStrategyManager {
  private readonly linkedinSendTemplateStrategyManager: LinkedinSendTemplateStrategyManager;
  private readonly telegramSendTemplateStrategyManager: TelegramSendTemplateStrategyManager;

  constructor() {
    this.linkedinSendTemplateStrategyManager = new LinkedinSendTemplateStrategyManager();
    this.telegramSendTemplateStrategyManager = new TelegramSendTemplateStrategyManager();
  }

  public getStrategy(url: string, messageType: MESSAGE_TYPE): SendTemplateStrategy | null {
    const strategyManager = this.getStrategyManager(url);
    if (strategyManager) {
      return strategyManager.getStrategy(url, messageType);
    }
    return null;
  }

  private getStrategyManager(url: string): SendTemplateStrategyManager | null {
    if (isLinkedinUrl(url)) {
      return this.linkedinSendTemplateStrategyManager;
    } else if (isTelegramUrl(url)) {
      return this.telegramSendTemplateStrategyManager;
    }
    return null;
  }
}
