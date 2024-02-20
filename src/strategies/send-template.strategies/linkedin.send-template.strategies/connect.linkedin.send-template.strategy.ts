import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithRandomDelayAfter,
  findPageElementsByClassName,
  findPageElementById,
  setElementText,
  interpolate,
  findChildsInsideElementRecursively,
  formatNewErrorMessage,
  moveCaretToTextStart,
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class ConnectLinkedinConnectSendTemplateStrategy implements SendTemplateStrategy {
  private readonly MAX_CONNECT_MESSAGE_LENGTH = 300;

  private readonly openConnectModalButton = {
    sectionClassName: 'scaffold-layout__main',
    type: 'connect',
    iconMedium: 'connect-medium',
    iconSmall: 'connect-small',
  };

  private readonly personalizeButton = {
    className: 'artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1',
  };

  private readonly personalizeInput = {
    id: 'custom-message',
  };

  constructor(private receivePageInfoStrategy: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    let result: SendTemplateResult = {};
    try {
      await this.openDialog();
      const text = this.getText(template);
      result = this.validateText(text);
      if (result.errors && result.errors.length) {
        throw new Error();
      }
      this.insertTextToInput(text);
    } catch (e) {
      if (e.message) {
        result.errors ? result.errors.push(e.message) : (result.errors = [e.message]);
      }
    }
    return result;
  }

  private async openDialog(): Promise<void> {
    await this.clickOpenConnectModalButton();
    await this.clickPersonalizeButton();
  }

  private getText(template: Template): string {
    const pageInfo = this.receivePageInfoStrategy.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
  }

  private async clickOpenConnectModalButton(): Promise<void> {
    const buttonSection = findPageElementsByClassName(this.openConnectModalButton.sectionClassName)[0];
    if (!buttonSection) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find button section.',
        functionName: 'clickOpenConnectModalButton',
        className: 'LinkedinConnectSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    let button: HTMLButtonElement = <HTMLButtonElement>(
      findChildsInsideElementRecursively(
        buttonSection,
        (el: HTMLElement) => el.getAttribute('type') === this.openConnectModalButton.type,
      )[0]
    );

    if (!button) {
      const buttonIconMedium = findChildsInsideElementRecursively(
        buttonSection,
        (el: HTMLElement) => el.getAttribute('data-test-icon') === this.openConnectModalButton.iconMedium,
      )[0];
      const buttonIconSmall = findChildsInsideElementRecursively(
        buttonSection,
        (el: HTMLElement) => el.getAttribute('data-test-icon') === this.openConnectModalButton.iconSmall,
      )[0];
      const buttonIcon = buttonIconMedium || buttonIconSmall
      button = <HTMLButtonElement>buttonIcon?.parentElement;
    }

    if (!button) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find connect button. Maybe you are already connected.',
        functionName: 'clickOpenConnectModalButton',
        className: 'LinkedinConnectSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    await clickWithRandomDelayAfter(button);
  }

  private async clickPersonalizeButton(): Promise<void> {
    const button = findPageElementsByClassName(this.personalizeButton.className)[0];
    if (!button) {
      return;
    }
    await clickWithRandomDelayAfter(button);
  }

  private insertTextToInput(text: string): void {
    const input = <HTMLTextAreaElement>findPageElementById(this.personalizeInput.id);
    if (!input) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find connect message input',
        functionName: 'insertTextToInput',
        className: 'LinkedinConnectSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    setElementText(input, text);
    moveCaretToTextStart(input);
  }

  private validateText(text: string): SendTemplateResult {
    const textLength = text.length;
    if (textLength > this.MAX_CONNECT_MESSAGE_LENGTH) {
      return {
        warnings: [
          `The inserted text length is ${textLength} characters - max is 300 ${this.MAX_CONNECT_MESSAGE_LENGTH}.`,
        ],
      };
    }
    return {};
  }
}
