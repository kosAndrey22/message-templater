import { MESSAGE_TYPE, PAGE_EVENT, SMALL_DEFAULT_CLICK_DELAY_MS } from '../../../constants';
import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithRandomDelayAfter,
  findPageElementsByClassName,
  setElementText,
  interpolate,
  findChildsInsideElementRecursively,
  formatErrorMessage,
  moveCaretToTextStart,
  sendPageRuntimeEvent,
  getDefaultRandomClickParams,
  elementClassListContainsClass,
} from '../../../helpers';
import {
  ResendTemplateIfRedirectedPageEvent,
  ReceivePageInfoStrategy,
  SendTemplateResult,
  SendTemplateStrategy,
  Template,
  SendTemplatePageEvent,
} from '../../../interfaces';

export class SendLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private readonly idPositionInImageUrl = 5;

  private readonly profileImage = {
    class: 'pv-top-card-profile-picture__image--show evi-image ember-view',
  };

  private readonly dialogPopup = {
    class: 'msg-convo-wrapper msg-overlay-conversation-bubble msg-overlay-conversation-bubble--default-inactive ml4',
    imageClassName: 'evi-image',
    closedClassName: 'msg-overlay-conversation-bubble--is-minimized',
  };

  private readonly openDialogButton = {
    sectionClassName: 'scaffold-layout__main',
    // Types of send button for first attempt for finding it.
    type: 'send-privately',
    lockedType: 'locked',
    // Icon of send button for second attempt for finding it.
    icon: 'send-privately-small',
    // Class of send button without icon for third attempt for finding it.
    withoutIconVariantClassName: 'artdeco-button--primary',
  };

  private readonly messageInput = {
    role: 'textbox',
  };

  constructor(private receivePageInfoStrategy: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
      await this.openDialog();
      const text = this.getText(template);
      this.sendResendTemplateIfRedirectedEvent(template);
      await this.insertTextToInput(text);
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
    const pageInfo = this.receivePageInfoStrategy.receive();
    const text = interpolate(template.text, pageInfo);
    return text;
  }

  private async clickOpenDialogButton(): Promise<void> {
    const buttonSection = findPageElementsByClassName(this.openDialogButton.sectionClassName)[0];
    if (!buttonSection) {
      const errorMessage = formatErrorMessage({
        message: 'Can not find button section.',
        functionName: 'clickOpenConnectModalButton',
        className: 'SendLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    const button = this.getOpenSendModalButtonOnButtonSection(buttonSection);
    await clickWithRandomDelayAfter(button);
  }

  private getOpenSendModalButtonOnButtonSection(buttonSection: HTMLElement): HTMLButtonElement {
    // first attempt to find button.
    const elements = findChildsInsideElementRecursively(
      buttonSection,
      (el: HTMLElement) =>
        el.getAttribute('type') === this.openDialogButton.type ||
        el.getAttribute('type') === this.openDialogButton.lockedType,
    );
    let button = <HTMLButtonElement>elements[0];

    // second attempt to find button.
    if (!button) {
      const buttonIcon = findChildsInsideElementRecursively(
        buttonSection,
        (el: HTMLElement) => el.getAttribute('data-test-icon') === this.openDialogButton.icon,
      )[0];
      button = <HTMLButtonElement>buttonIcon?.parentElement;
    }

    // third attempt to find button.
    if (!button) {
      button = <HTMLButtonElement>(
        findChildsInsideElementRecursively(buttonSection, (el: HTMLElement) =>
          elementClassListContainsClass(el, this.openDialogButton.withoutIconVariantClassName),
        )[0]
      );
    }

    if (!button) {
      const errorMessage = formatErrorMessage({
        message: 'Can not find send message button.',
        functionName: 'clickOpenDialogButton',
        className: 'SendLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    return button;
  }

  private async insertTextToInput(text: string): Promise<void> {
    const input = await this.getDialogInputWithOpenedUser();
    if (!input) {
      const errorMessage = formatErrorMessage({
        message: 'Can not find send input.',
        functionName: 'insertTextToInput',
        className: 'SendLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    await clickWithRandomDelayAfter(input, ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS));
    setElementText(input, text);
    moveCaretToTextStart(input);
  }

  private sendResendTemplateIfRedirectedEvent(template: Template): void {
    const event: ResendTemplateIfRedirectedPageEvent<SendTemplatePageEvent> = {
      event: {
        template,
        messageType: MESSAGE_TYPE.NORMAL_MESSAGE,
        type: PAGE_EVENT.SEND_TEMPLATE,
      },
      type: PAGE_EVENT.RESEND_TEMPLATE_IF_REDIRECTED,
    };
    sendPageRuntimeEvent(event);
  }

  private async getDialogInputWithOpenedUser(): Promise<HTMLInputElement | null> {
    const dialogs = findPageElementsByClassName(this.dialogPopup.class);
    const pageAvatar = this.getPageAvatar();
    if (!pageAvatar) {
      return null;
    }
    const avatarUrl = pageAvatar.src;
    const userId = this.getUserIdFromAvatarUrl(avatarUrl);

    let currentDialog = dialogs.find((d) => {
      const img = findChildsInsideElementRecursively(d, (el) =>
        elementClassListContainsClass(el, this.dialogPopup.imageClassName),
      )[0];
      if (!img) {
        return;
      }
      const userIdFromDialog = this.getUserIdFromAvatarUrl((<HTMLImageElement>img).src);
      return userId === userIdFromDialog;
    });

    if (!currentDialog) {
      const profileImageAltText = pageAvatar.alt;
      const nameFromAvatarAltText = profileImageAltText.split(',')[0];

      currentDialog = dialogs.find((d) => {
        const img = findChildsInsideElementRecursively(d, (el) =>
          elementClassListContainsClass(el, this.dialogPopup.imageClassName),
        )[0];
        if (!img) {
          return;
        }
        const imageAltText = (<HTMLImageElement>img).alt;
        const nameFromImageAltText = imageAltText.split(',')[0];
        return nameFromImageAltText === nameFromAvatarAltText;
      });
    }

    if (!currentDialog) {
      return null;
    }

    await this.openDialogPopupIfNeeded(currentDialog);

    const input = findChildsInsideElementRecursively(
      currentDialog,
      (el) => el.getAttribute('role') === this.messageInput.role,
    )[0];
    return <HTMLInputElement>input;
  }

  private async openDialogPopupIfNeeded(currentDialog: HTMLElement): Promise<void> {
    const dialogClosed = elementClassListContainsClass(currentDialog, this.dialogPopup.closedClassName);
    if (dialogClosed) {
      const header = currentDialog.children[1];
      await clickWithRandomDelayAfter(
        <HTMLElement>header,
        ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS),
      );
    }
  }

  private getPageAvatar(): HTMLImageElement | null {
    const img = findPageElementsByClassName(this.profileImage.class)[0];
    return img ? <HTMLImageElement>img : null;
  }

  private getUserIdFromAvatarUrl(url: string): string {
    const splitted = url.split('/');
    return splitted[this.idPositionInImageUrl];
  }
}
