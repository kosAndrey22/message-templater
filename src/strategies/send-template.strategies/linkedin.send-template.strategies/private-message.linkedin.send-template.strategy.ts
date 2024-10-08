import { SMALL_DEFAULT_CLICK_DELAY_MS } from '../../../constants';
import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithRandomDelayAfter,
  findPageElementsByClassName,
  formatErrorMessage,
  getDefaultRandomClickParams,
  interpolate,
  moveCaretToTextStart,
  setElementText,
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class PrivateMessageLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private readonly messageInputContainer = {
    class: 'msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate',
  };

  constructor(private receivePageInfoStrategy: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
      const text = this.getText(template);
      await this.insertTextToInput(text);
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

  private async insertTextToInput(text: string): Promise<void> {
    const input = findPageElementsByClassName(this.messageInputContainer.class)[0];
    if (!input) {
      const errorMessage = formatErrorMessage({
        message: 'Can not find send input.',
        functionName: 'insertTextToInput',
        className: 'PrivateMessageLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    await clickWithRandomDelayAfter(input, ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS));
    setElementText(input, text);
    moveCaretToTextStart(input);
  }
}
