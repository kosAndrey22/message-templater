import { findPageElementById, removeInvalidChars, stringContainsInvalidCharsOnly } from '../../../helpers';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class PrivateMessagesLinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  private profileFullNameHeader = {
    id: 'thread-detail-jump-target',
  };

  protected receiveInfo(): PageInfo {
    const pageInfo: PageInfo = {};
    const [firstName, lastName] = this.getFirstAndLastNameFromHeader();
    if (firstName) {
      pageInfo.firstName = firstName;
    }
    if (lastName) {
      pageInfo.lastName = lastName;
    }
    if (firstName && lastName) {
      pageInfo.fullName = `${firstName} ${lastName}`;
    }
    return pageInfo;
  }

  private getFirstAndLastNameFromHeader(): [string | undefined, string | undefined] | [] {
    const fullNameHeader = findPageElementById(this.profileFullNameHeader.id);
    if (!fullNameHeader) {
      return [];
    }
    const stringFromHeader = fullNameHeader.textContent.split(' ');
    const withoutOnlyInvalidChars = stringFromHeader.filter((s) => !stringContainsInvalidCharsOnly(s));
    const formatted = withoutOnlyInvalidChars.map((s) => removeInvalidChars(s));
    const [firstName, lastName] = formatted;
    return [firstName, lastName];
  }
}
