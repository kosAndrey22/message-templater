import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithDelayAfter,
  findPageElementsByClassName,
  setElementText,
  interpolate,
  findChildsInsideElementRecursively,
  formatNewErrorMessage,
  moveCaretToTextStart,
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class SendLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private openDialogButton = {
    sectionClassName: 'artdeco-card ember-view pv-top-card',
    type: 'send-privately',
    lockedType: 'locked',
  };

  private messageInput = {
    class: 'msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate      ',
  };

  constructor(private pageInfoReceiver: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
      await this.openDialog();
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

  private async openDialog(): Promise<void> {
    await this.clickOpenDialogButton();
  }

  private getText(template: Template): string {
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
  }

  private async clickOpenDialogButton(): Promise<void> {
    const buttonSection = findPageElementsByClassName(this.openDialogButton.sectionClassName)[0];
    if (!buttonSection) {
      return;
    }
    const elements = findChildsInsideElementRecursively(
      buttonSection,
      (el: HTMLElement) =>
        el.getAttribute('type') === this.openDialogButton.type ||
        el.getAttribute('type') === this.openDialogButton.lockedType,
    );
    const button = <HTMLButtonElement>elements[0];
    if (!button) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find send message button.',
        functionName: 'clickOpenDialogButton',
        className: 'LinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    await clickWithDelayAfter(button);
  }

  private insertTextToInput(text: string): void {
    const input = findPageElementsByClassName(this.messageInput.class)[0];
    if (!input) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find connect send input.',
        functionName: 'insertTextToInput',
        className: 'LinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    input.click();
    setElementText(input, text);
    moveCaretToTextStart(input);
  }
}
