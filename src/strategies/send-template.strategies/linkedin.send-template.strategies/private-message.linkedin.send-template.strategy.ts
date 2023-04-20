import { HTMLElementNotFoundError } from '../../../errors';
import {
  findPageElementsByClassName,
  formatNewErrorMessage,
  interpolate,
  moveCaretToTextStart,
  setElementText,
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class PrivateMessageLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private messageInputContainer = {
    class: 'msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate',
  };

  constructor(private pageInfoReceiver: ReceivePageInfoStrategy) {}

  public send(template: Template): SendTemplateResult {
    const result: SendTemplateResult = {};
    try {
      const text = this.getText(template);
      this.insertTextToInput(text);
      return {};
    } catch (e) {
      if (e.message) {
        result.errors ? result.errors.push(e.message) : (result.errors = [e.message]);
      }
    }
    return result;
  }

  private getText(template: Template): string {
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
  }

  private insertTextToInput(text: string): void {
    const input = findPageElementsByClassName(this.messageInputContainer.class)[0];
    if (!input) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find send input.',
        functionName: 'insertTextToInput',
        className: 'PrivateMessageLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    input.click();
    setElementText(input, text);
    moveCaretToTextStart(input);
  }
}
