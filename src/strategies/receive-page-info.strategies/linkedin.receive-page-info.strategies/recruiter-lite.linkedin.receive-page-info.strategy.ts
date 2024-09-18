import { PLACEHOLDER } from '../../../constants';
import { findPageElementsByClassName } from '../../../helpers';
import { LinkedinPageDataFormatterStrategy } from '../../page-data-formattes.strategies';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class RecruiterLiteLinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected readonly pageDataFormatterService = new LinkedinPageDataFormatterStrategy();

  private readonly profileFullNameHeader = {
    className: 'lockup',
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
    const fullNameHeaderContainerText =
      fullNameHeader.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent;
    return this.pageDataFormatterService.formatFullNameHeaderContent(fullNameHeaderContainerText);
  }
}
