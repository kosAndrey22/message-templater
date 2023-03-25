import { HTMLElementNotFoundError } from '../../errors';
import {
  clickWithDelayAfter,
  findPageElementsByClassName,
  findPageElementById,
  setElementText,
  interpolate,
  findChildsInsideElementRecursively,
  formatNewErrorMessage,
  moveCaretToTextStart,
} from '../../helpers';
import { ReceivePageInfoStrategy, SendTemplateStrategy, Template } from '../../interfaces';

export class LinkedinConnectSendTemplateStrategy implements SendTemplateStrategy {
  private openConnectModalButton = {
    sectionClassName: 'artdeco-card ember-view pv-top-card',
    type: 'connect',
  };

  private personalizeButton = {
    className: 'artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1',
  };

  private personalizeInput = {
    id: 'custom-message',
  };

  constructor(private pageInfoReceiver: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<void> {
    await this.clickOpenConnectModalButton();
    await this.clickPersonalizeButton();
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    this.insertText(text);
  }

  private async clickOpenConnectModalButton(): Promise<void> {
    const buttonSection = findPageElementsByClassName(this.openConnectModalButton.sectionClassName)[0];
    if (!buttonSection) {
      return;
    }
    const elements = findChildsInsideElementRecursively(
      buttonSection,
      (el: HTMLElement) => el.getAttribute('type') === this.openConnectModalButton.type,
    );
    const button = <HTMLButtonElement>elements[0];
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
    const input = <HTMLTextAreaElement>findPageElementById(this.personalizeInput.id);
    if (!input) {
      const errorMessage = formatNewErrorMessage(
        'Can not find connect message input',
        'insertText',
        'LinkedinConnectSendTemplateStrategy',
      );
      throw new HTMLElementNotFoundError(errorMessage);
    }
    setElementText(input, text);
    moveCaretToTextStart(input);
  }
}
