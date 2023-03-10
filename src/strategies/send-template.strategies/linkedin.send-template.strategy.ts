import { clickWithDelayAfter, findPageElementsByClassName, insertTextToElement, interpolate } from '../../helpers';
import { ReceivePageInfoStrategy, SendTemplateStrategy, Template } from '../../interfaces';

export class LinkedinSendTemplateStrategy implements SendTemplateStrategy {

  private openDialogButton = {
    className: 'artdeco-button__icon',
    type: 'send-privately',
  };

  private messageInput = {
    parentClass: 'msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate      ',
  };

  constructor(
    private pageInfoReceiver: ReceivePageInfoStrategy,
  ) { }

  public async send(template: Template): Promise<void> {
    await this.clickOpenDialogButton();
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    this.insertText(text);
  }

  private async clickOpenDialogButton(): Promise<void> {
    const elements = findPageElementsByClassName(this.openDialogButton.className);
    const button = elements.find((el) => el.getAttribute('type') === this.openDialogButton.type);
    if (!button) {
      return;
    }
    await clickWithDelayAfter(button);
  }

  private insertText(text: string): void {
    const inputParent = findPageElementsByClassName(this.messageInput.parentClass)[0];
    if (!inputParent) {
      return;
    }
    const input = <HTMLElement>inputParent.firstChild;
    insertTextToElement(input, text);
  }
}
