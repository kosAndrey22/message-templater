import { PLACEHOLDER } from '../../../constants';
import {
  elementClassListContainsClass,
  findChildsInsideElementRecursively,
  findPageElementsByClassName,
} from '../../../helpers';
import { TelegramPageDataFormatterStrategy } from '../../page-data-formattes.strategies';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class ChatTelegramAVersionReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected readonly pageDataFormatterService = new TelegramPageDataFormatterStrategy();

  private readonly profileFullNameHeader = {
    className: 'ChatInfo',
  };

  private readonly profileFullNameText = {
    className: 'fullName',
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

    const fullNameDiv = findChildsInsideElementRecursively(fullNameHeader, (el) =>
      elementClassListContainsClass(el, this.profileFullNameText.className),
    );
    const fullNameHeaderText = fullNameDiv[0].textContent;
    return this.pageDataFormatterService.formatFullNameHeaderContent(fullNameHeaderText);
  }
}
