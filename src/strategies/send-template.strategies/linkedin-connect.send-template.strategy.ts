import { clickWithDelayAfter, findPageElementsByClassName, findPageElementsById, setElementText, interpolate } from '../../helpers';
import { ReceivePageInfoStrategy, SendTemplateStrategy, Template } from '../../interfaces';

export class LinkedinConnectSendTemplateStrategy implements SendTemplateStrategy {
  private openConnectModalButton = {
    parentClassName: 'pv-top-card-v2-ctas',
  };

  private personalizeButton = {
    className: 'artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1',
  };

  private personalizeInput = {
    id: 'custom-message',
  };

  constructor(
    private pageInfoReceiver: ReceivePageInfoStrategy,
  ) { }

  public async send(template: Template): Promise<void> {
    await this.clickOpenConnectModalButton();
    await this.clickPersonalizeButton();
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    this.insertText(text);
  }

  private async clickOpenConnectModalButton(): Promise<void> {
    const elements = findPageElementsByClassName(this.openConnectModalButton.parentClassName);
    const button = <HTMLButtonElement>elements[0]?.firstElementChild?.firstElementChild?.firstElementChild;
    if (!button) {
      return;
    }
    await clickWithDelayAfter(button);
  }

  private async clickPersonalizeButton(): Promise<void> {
    const button = findPageElementsByClassName(this.personalizeButton.className)[0];
    if (!button) {
      return;
    }
    await clickWithDelayAfter(button);
  }

  private insertText(text: string): void {
    const input = <HTMLTextAreaElement>findPageElementsById(this.personalizeInput.id);
    if (!input) {
      return;
    }
    setElementText(input, text);
  }

}
