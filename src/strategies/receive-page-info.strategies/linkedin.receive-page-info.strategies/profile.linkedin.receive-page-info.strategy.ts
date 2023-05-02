import { findPageElementsByClassName, removeInvalidChars, stringContainsInvalidCharsOnly } from '../../../helpers';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class ProfileLinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
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
    const withoutOnlyInvalidChars = stringFromHeader.filter((s) => !stringContainsInvalidCharsOnly(s));
    const formatted = withoutOnlyInvalidChars.map((s) => removeInvalidChars(s));
    const [firstName, lastName] = formatted;
    return [firstName, lastName];
  }
}
