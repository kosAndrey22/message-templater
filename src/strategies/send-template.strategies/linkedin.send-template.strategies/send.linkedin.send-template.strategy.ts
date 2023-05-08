import { SMALL_DEFAULT_CLICK_DELAY_MS } from '../../../constants';
import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithRandomDelayAfter,
  findPageElementsByClassName,
  setElementText,
  interpolate,
  findChildsInsideElementRecursively,
  formatNewErrorMessage,
  moveCaretToTextStart,
  getDefaultRandomClickParams,
  elementClassListContainsClass,
} from '../../../helpers';
import { ReceivePageInfoStrategy, SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';

export class SendLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private idPositionInImageUrl = 5;

  private avatarHeader = {
    class: `pv-top-card-profile-picture pv-top-card-profile-picture__container display-block
      pv-top-card__photo presence-entity__image EntityPhoto-circle-9`,
  };

  private dialogPopup = {
    class: 'msg-convo-wrapper msg-overlay-conversation-bubble msg-overlay-conversation-bubble--default-inactive ml4',
    imageClassName: 'evi-image',
    closedClassName: 'msg-overlay-conversation-bubble--is-minimized',
  };

  private openDialogButton = {
    sectionClassName: 'artdeco-card ember-view pv-top-card',
    type: 'send-privately',
    lockedType: 'locked',
  };

  private messageInput = {
    role: 'textbox',
  };

  constructor(private pageInfoReceiver: ReceivePageInfoStrategy) {}

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
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
    await clickWithRandomDelayAfter(button);
  }

  private async insertTextToInput(text: string): Promise<void> {
    const input = await this.getDialogInputWithOpenedUser();
    if (!input) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find connect send input.',
        functionName: 'insertTextToInput',
        className: 'LinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    await clickWithRandomDelayAfter(input, ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS));
    setElementText(input, text);
    moveCaretToTextStart(input);
  }

  private async getDialogInputWithOpenedUser(): Promise<HTMLInputElement | null> {
    const dialogs = findPageElementsByClassName(this.dialogPopup.class);
    const avatarUrl = this.getPageAvatarUrl();
    const userId = this.getUserIdFromAvatarUrl(avatarUrl);

    const currentDialog = dialogs.find((d) => {
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
      return null;
    }

    const dialogClosed = elementClassListContainsClass(currentDialog, this.dialogPopup.closedClassName);
    if (dialogClosed) {
      const header = currentDialog.children[1];
      await clickWithRandomDelayAfter(
        <HTMLElement>header,
        ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS),
      );
    }

    const input = findChildsInsideElementRecursively(
      currentDialog,
      (el) => el.getAttribute('role') === this.messageInput.role,
    )[0];
    return <HTMLInputElement>input;
  }

  private getPageAvatarUrl(): string {
    const header = findPageElementsByClassName(this.avatarHeader.class);
    const img = header[0]?.firstElementChild;
    if (!img) {
      return '';
    }
    return (<HTMLImageElement>img).src;
  }

  private getUserIdFromAvatarUrl(url: string): string {
    const splitted = url.split('/');
    return splitted[this.idPositionInImageUrl];
  }
}
