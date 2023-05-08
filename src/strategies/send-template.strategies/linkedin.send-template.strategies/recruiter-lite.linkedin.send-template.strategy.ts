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
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class RecruiterLiteLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private messageInputContainer = {
    class: 'compose-body',
    inputClassname: 'compose-textarea__textarea',
  };

  constructor(private pageInfoReceiver: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
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
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
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
