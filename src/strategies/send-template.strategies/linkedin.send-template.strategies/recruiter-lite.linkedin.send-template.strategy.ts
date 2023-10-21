import { SMALL_DEFAULT_CLICK_DELAY_MS } from '../../../constants';
import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithRandomDelayAfter,
  findChildsInsideElementRecursively,
  findPageElementsByClassName,
  formatNewErrorMessage,
  getDefaultRandomClickParams,
  interpolate,
  moveCaretToTextStart,
  setElementText,
  sleep,
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendOptions, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class RecruiterLiteLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private readonly messageInputContainer = {
    class: 'compose-body',
    inputClassname: 'compose-textarea__textarea',
  };

  private readonly sendMessageButton = {
    class:
      'artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view profile-item-actions__item',
  };

  constructor(private receivePageInfoStrategy: ReceivePageInfoStrategy) {}

  public async send(template: Template, options: SendOptions): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
      const { tryWaitForElementsRender } = options;
      if (tryWaitForElementsRender) {
        await this.waitUntilInputLoad();
      }

      await this.openDialog();
      const text = this.getText(template);
      await this.insertTextToInput(text);
      return {};
    } catch (e) {
      if (e.message) {
        result.errors ? result.errors.push(e.message) : (result.errors = [e.message]);
      }
    }
    return result;
  }

  private getText(template: Template): string {
    const pageInfo = this.receivePageInfoStrategy.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
  }

  private async openDialog(): Promise<void> {
    const button = findPageElementsByClassName(this.sendMessageButton.class)[0];
    if (!button) {
      return;
    }
    await clickWithRandomDelayAfter(button, ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS));
  }

  private async waitUntilInputLoad(): Promise<void> {
    let inputContainer = null;
    const maxAttempts = 10;
    let attempt = 0;
    while (!inputContainer && attempt < maxAttempts) {
      await sleep(1000);
      inputContainer = findPageElementsByClassName(this.messageInputContainer.class)[0];
      attempt += 1;
    }
  }

  private async insertTextToInput(text: string): Promise<void> {
    const inputContainer = findPageElementsByClassName(this.messageInputContainer.class)[0];
    if (!inputContainer) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find send input.',
        functionName: 'insertTextToInput',
        className: 'RecruiterLiteLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    document.getElementsByClassName(this.messageInputContainer.class)[0];
    const input = findChildsInsideElementRecursively(
      inputContainer,
      (e): boolean => e.className === this.messageInputContainer.inputClassname,
    )[0];

    await clickWithRandomDelayAfter(input, ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS));
    setElementText(input, text);
    moveCaretToTextStart(input);
  }
}
