import { findPageElementsByClassName, removeInvalidChars, stringContainsInvalidCharsOnly } from '../../../helpers';
import { PageInfo } from '../../../types';
import { AbstractReceivePageStrategy } from '../abstract.receive-page-info.strategy';

export class RecruiterLiteLinkedinReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  private profileFullNameHeader = {
    className: 'lockup',
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
    const fullNameHeaderContainer =
      fullNameHeader.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
    const stringFromHeader = fullNameHeaderContainer.textContent.split(' ');
    const withoutOnlyInvalidChars = stringFromHeader.filter((s) => !stringContainsInvalidCharsOnly(s));
    const formatted = withoutOnlyInvalidChars.map((s) => removeInvalidChars(s));
    const [firstName, lastName] = formatted;
    return [firstName, lastName];
  }
}
