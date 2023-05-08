import { SMALL_DEFAULT_CLICK_DELAY_MS } from '../../../constants';
import { HTMLElementNotFoundError } from '../../../errors';
import {
  clickWithRandomDelayAfter,
  elementClassListContainsClass,
  findChildsInsideElementRecursively,
  findPageElementsByClassName,
  formatNewErrorMessage,
  getDefaultRandomClickParams,
  interpolate,
  moveCaretToTextStart,
  setElementText,
} from '../../../helpers';
import { SendTemplateResult, SendTemplateStrategy, Template } from '../../../interfaces';
import { LinkedinPageDataFormatterService } from '../../../services';
import { PageInfo } from '../../../types';

export class OpenDialogsLinkedinSendTemplateStrategy implements SendTemplateStrategy {
  private readonly pageDataFormatterService = new LinkedinPageDataFormatterService();

  private readonly dialogPopup = {
    class: 'msg-convo-wrapper msg-overlay-conversation-bubble msg-overlay-conversation-bubble--default-inactive ml4',
    closedClassName: 'msg-overlay-conversation-bubble--is-minimized',
    profileLinkClass: 'app-aware-link  profile-card-one-to-one__profile-link',
    headerClass: 'pl1 msg-overlay-bubble-header__title truncate t-14 t-bold',
  };

  private readonly messageInput = {
    role: 'textbox',
  };

  public async send(template: Template): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {};
    try {
      const openDialogs = this.getOpenDialogs();

      // Use await in a loop so not to insert all texts at one time.
      for (let i = 0; i < openDialogs.length; i += 1) {
        const currentDialog = openDialogs[i];
        const text = this.getText(template, currentDialog);
        await this.insertText(text, currentDialog);
      }
    } catch (e) {
      if (e.message) {
        result.errors ? result.errors.push(e.message) : (result.errors = [e.message]);
      }
    }
    return result;
  }

  private getOpenDialogs(): HTMLElement[] {
    const dialogs = findPageElementsByClassName(this.dialogPopup.class);
    const openDialogs = dialogs.filter((d) => !elementClassListContainsClass(d, this.dialogPopup.closedClassName));
    if (!openDialogs.length) {
      const errorMessage = formatNewErrorMessage({
        message: 'Can not find any open dialogs.',
        functionName: 'send',
        className: 'OpenDialogsLinkedinSendTemplateStrategy',
      });
      throw new HTMLElementNotFoundError(errorMessage);
    }
    return openDialogs;
  }

  private getText(template: Template, dialogPopup: HTMLElement): string {
    const pageInfo = this.getUserNames(dialogPopup);
    const text = interpolate(template.text, pageInfo);
    return text;
  }

  private async insertText(text: string, dialogPopup: HTMLElement): Promise<void> {
    const input = findChildsInsideElementRecursively(
      dialogPopup,
      (el) => el.getAttribute('role') === this.messageInput.role,
    )[0];

    await clickWithRandomDelayAfter(input, ...getDefaultRandomClickParams(SMALL_DEFAULT_CLICK_DELAY_MS));
    setElementText(input, text);
    moveCaretToTextStart(input);
  }

  private getUserNames(dialogPopup: HTMLElement): PageInfo {
    let namesString = this.getNamesFromDialogHeader(dialogPopup);
    if (!namesString) {
      namesString = this.getNamesFromDialogProfileLink(dialogPopup);
    }
    return this.formatNamesString(namesString);
  }

  private getNamesFromDialogHeader(dialogPopup: HTMLElement): string {
    const header = findChildsInsideElementRecursively(
      dialogPopup,
      (el) => el.className === this.dialogPopup.headerClass,
    )[0];
    if (!header) {
      return '';
    }
    return header.firstElementChild.firstElementChild.textContent;
  }

  private getNamesFromDialogProfileLink(dialogPopup: HTMLElement): string {
    const pageProfileLink = findChildsInsideElementRecursively(
      dialogPopup,
      (el) => el.className === this.dialogPopup.profileLinkClass,
    )[0];
    if (!pageProfileLink) {
      return '';
    }
    return pageProfileLink.textContent;
  }

  private formatNamesString(str: string): PageInfo {
    const pageUserNamesInfo = this.pageDataFormatterService.formatFullNameHeaderContent(str);
    const formattedPageInfo = this.pageDataFormatterService.formatPageInfo(pageUserNamesInfo);
    return formattedPageInfo;
  }
}
