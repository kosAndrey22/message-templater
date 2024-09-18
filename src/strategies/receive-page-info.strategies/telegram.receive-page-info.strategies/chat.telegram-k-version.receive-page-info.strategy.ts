import { PLACEHOLDER } from '../../../constants';
import { elementClassListContainsClass, findChildsInsideElementRecursively, findPageElementsByClassName } from '../../../helpers';
import { TelegramPageDataFormatterStrategy } from '../../page-data-formattes.strategies';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class ChatTelegramKVersionReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected readonly pageDataFormatterService = new TelegramPageDataFormatterStrategy();

  private readonly profileFullNameHeader = {
    className: 'top',
  };

  protected receiveInfo(): PageInfo {
    const pageInfo = this.getFirstAndLastNameFromHeader();
    return pageInfo;
  }

  private getFirstAndLastNameFromHeader(): Partial<Pick<PageInfo, PLACEHOLDER.FIRST_NAME | PLACEHOLDER.LAST_NAME>> {
    const fullNameHeader = findPageElementsByClassName(this.profileFullNameHeader.className)[0];
    if (!fullNameHeader) {
      return {};
    }

    const fullNameDiv = fullNameHeader.firstElementChild.firstElementChild;
    const fullNameHeaderText = fullNameDiv.textContent;
    return this.pageDataFormatterService.formatFullNameHeaderContent(fullNameHeaderText);
  }
}
