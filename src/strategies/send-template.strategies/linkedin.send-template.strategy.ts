import { HTMLElementNotFoundError } from '../../errors';
import {
  clickWithDelayAfter,
  findPageElementsByClassName,
  setElementText,
  interpolate,
  findChildsInsideElementRecursively,
  formatNewErrorMessage,
  moveCaretToTextStart,
} from '../../helpers';
import { ReceivePageInfoStrategy, SendTemplateStrategy, Template } from '../../interfaces';

export class LinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private openDialogButton = {
    sectionClassName: 'artdeco-card ember-view pv-top-card',
    type: 'send-privately',
    lockedType: 'locked',
  };

  private messageInput = {
    class: 'msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate      ',
  };

  constructor(private pageInfoReceiver: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<void> {
    await this.clickOpenDialogButton();
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    this.insertText(text);
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
      return;
    }
    await clickWithDelayAfter(button);
  }

  private insertText(text: string): void {
    const input = findPageElementsByClassName(this.messageInput.class)[0];
    if (!input) {
      const errorMessage = formatNewErrorMessage(
        'Can not find connect send input',
        'insertText',
        'LinkedinSendTemplateStrategy',
      );
      throw new HTMLElementNotFoundError(errorMessage);
    }
    input.click();
    setElementText(input, text);
    moveCaretToTextStart(input);
  }
}
