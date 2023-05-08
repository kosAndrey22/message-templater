import { PLACEHOLDER } from '../../../constants';
import { findPageElementsByClassName } from '../../../helpers';
import { LinkedinPageDataFormatterService } from '../../../services';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class ProfileLinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected readonly pageDataFormatterService = new LinkedinPageDataFormatterService();

  private readonly profileFullNameHeader = {
    className: 'text-heading-xlarge inline t-24 v-align-middle break-words',
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
    const fullNameHeaderText = fullNameHeader.textContent;
    return this.pageDataFormatterService.formatFullNameHeaderContent(fullNameHeaderText);
  }
}
