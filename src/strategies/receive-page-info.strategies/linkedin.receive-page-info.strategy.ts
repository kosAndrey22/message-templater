import { findPageElementsByClassName } from '../../helpers';
import { ReceivePageInfoStrategy } from '../../interfaces';
import { PageInfo } from '../../types';

export class LinkedinReceivePageInfoStrategy implements ReceivePageInfoStrategy {
  private profileFullNameHeader = {
    className: 'text-heading-xlarge inline t-24 v-align-middle break-words',
  };

  public receive(): PageInfo {
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
    const [firstName, lastName] = fullNameHeader.textContent.split(' ');
    return [firstName, lastName];
  }
}
