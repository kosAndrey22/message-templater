import { PLACEHOLDER } from '../../../constants';
import { findPageElementById } from '../../../helpers';
import { LinkedinPageDataFormatterService } from '../../../services';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class PrivateMessagesLinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected readonly pageDataFormatterService = new LinkedinPageDataFormatterService();
  private readonly profileFullNameHeader = {
    id: 'thread-detail-jump-target',
  };

  protected receiveInfo(): PageInfo {
    const pageInfo = this.getFirstAndLastNameFromHeader();
    return pageInfo;
  }

  private getFirstAndLastNameFromHeader(): Partial<Pick<PageInfo, PLACEHOLDER.FIRST_NAME | PLACEHOLDER.LAST_NAME>> {
    const fullNameHeader = findPageElementById(this.profileFullNameHeader.id);
    if (!fullNameHeader) {
      return {};
    }
    const fullNameHeaderText = fullNameHeader.textContent;
    return this.pageDataFormatterService.formatFullNameHeaderContent(fullNameHeaderText);
  }
}
