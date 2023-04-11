import { findPageElementsByClassName, removeInvalidChars } from '../../helpers';
import { PageInfo } from '../../types';
import { AbstractReceivePageStrategy } from './abstract.receive-page-info.strategy';

export class LinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  private profileFullNameHeader = {
    className: 'text-heading-xlarge inline t-24 v-align-middle break-words',
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
    const fullNameHeader = findPageElementsByClassName(this.profileFullNameHeader.className)[0];
    if (!fullNameHeader) {
      return [];
    }
    const stringFromHeader = fullNameHeader.textContent.split(' ');
    const withoutEmojis = stringFromHeader.map((s) => removeInvalidChars(s));
    const withoutEmpty = withoutEmojis.filter((s) => s.length > 0);
    const [firstName, lastName] = withoutEmpty;
    return [firstName, lastName];
  }
}
