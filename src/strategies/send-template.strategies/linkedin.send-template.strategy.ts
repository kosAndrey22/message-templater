import { addClassToElemetClassList, clickWithDelayAfter, findPageElementsByClassName, interpolate, removeClassFromElemetClassList } from '../../helpers';
import { ReceivePageInfoStrategy, SendTemplateStrategy, Template } from '../../interfaces';

export class LinkedinSendTemplateStrategy implements SendTemplateStrategy {

  private openDialogButton = {
    className: 'artdeco-button__icon',
    type: 'send-privately',
  };

  private messageInput = {
    parentClass: 'msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate      ',
  };

  private messageInputPlaceholder = {
    placeholderClassName: 'msg-form__placeholder',
  };

  private sendInputParentContainer = {
    className: 'msg-form__msg-content-container\n    \n     msg-form__message-texteditor relative flex-grow-1 display-flex',
    focusedClassName: 'msg-form__msg-content-container--is-active',
  };

  private sendButton = {
    className: 'msg-form__send-button artdeco-button artdeco-button--1',
  };

  constructor(
    private pageInfoReceiver: ReceivePageInfoStrategy,
  ) { }

  public async send(template: Template): Promise<void> {
    await this.clickOpenDialogButton();
    const pageInfo = this.pageInfoReceiver.receive();
    const text = interpolate(template.text, pageInfo);
    this.insertText(text);
    this.disableSendButton();
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
    this.removeSendInputPlaceholder(inputParent);
    this.setSendInputParentContainerActive();
    input.textContent = text;
  }

  private removeSendInputPlaceholder(input: HTMLElement): void {
    const placehoderElement = input.nextElementSibling;
    if (!placehoderElement) {
      return;
    }
    removeClassFromElemetClassList(<HTMLElement>placehoderElement, this.messageInputPlaceholder.placeholderClassName);
  }

  private disableSendButton(): void {
    const sendButton = <HTMLButtonElement>(findPageElementsByClassName(this.sendButton.className)[0]);
    if (!sendButton) {
      return;
    }
    sendButton.disabled = false;
  }

  private setSendInputParentContainerActive(): void {
    const parent = findPageElementsByClassName(this.sendInputParentContainer.className)[0];
    if (!parent) {
      return;
    }
    addClassToElemetClassList(parent, this.sendInputParentContainer.focusedClassName);
  }
}
