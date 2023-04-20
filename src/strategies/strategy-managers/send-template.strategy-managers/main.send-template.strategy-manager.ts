import { MESSAGE_TYPE } from '../../../constants';
import { isLinkedinUrl } from '../../../helpers';
import { SendTemplateStrategy, SendTemplateStrategyManager } from '../../../interfaces';
import { LinkedinSendTemplateStrategyManager } from './linkedin.send-template.strategy-manager';

export class MainSendTemplateStrategyManager implements SendTemplateStrategyManager {
  linkedinSendTemplateStrategyManager: LinkedinSendTemplateStrategyManager;

  constructor() {
    this.linkedinSendTemplateStrategyManager = new LinkedinSendTemplateStrategyManager();
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
    }
    return null;
  }
}
