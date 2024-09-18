
import { HTMLElementNotFoundError } from '../../../errors';
import { clickWithRandomDelayAfter, findPageElementById, findPageElementsByClassName, formatErrorMessage, interpolate, moveCaretToTextStart, setElementText } from '../../../helpers';
import {
  ReceivePageInfoStrategy,
  SendTemplateResult,
  SendTemplateStrategy,
  Template,
} from '../../../interfaces';

export class SendTenegramAWersionSendTemplateStrategy implements SendTemplateStrategy {
  private textInput = {
    class: 'editable-message-text',
  }

  constructor(private receivePageInfoStrategy: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};

    try {
      await this.insertText(template);
    } catch (e) {
      if (e.message) {
        result.errors ? result.errors.push(e.message) : (result.errors = [e.message]);
      }
    }

    return result;
  }

  private async insertText(template: Template) {
    const input = this.getInput();
    const text = this.getText(template);
    await clickWithRandomDelayAfter(
      <HTMLElement>input,
    );
    setElementText(input, text);
    moveCaretToTextStart(input);
  }

  private getInput(): HTMLInputElement | null {
    const input = findPageElementById(this.textInput.class);
    if (!input) {
      const errorMessage = formatErrorMessage({
        message: 'Can not find send input.',
        functionName: 'getInput',
        className: 'SendTenegramAWersionSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    return <HTMLInputElement>input || null;
  }

  private getText(template: Template): string {
    const pageInfo = this.receivePageInfoStrategy.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
  }

}
