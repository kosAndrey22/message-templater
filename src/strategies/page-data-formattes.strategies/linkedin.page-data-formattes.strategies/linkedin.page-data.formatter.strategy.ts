import { PLACEHOLDER } from '../../../constants';
import { removeInvalidChars, stringContainsInvalidCharsOnly } from '../../../helpers';
import { PageInfo } from '../../../types';
import { BasePageDataFormatterStrategy } from '../base.page-data.formatter.strategy';

export class LinkedinPageDataFormatterStrategy extends BasePageDataFormatterStrategy {
  public formatFullNameHeaderContent(
    content: string,
  ): Partial<Pick<PageInfo, PLACEHOLDER.FIRST_NAME | PLACEHOLDER.LAST_NAME>> {
    const stringFromHeader = content.split(' ');
    const withoutOnlyInvalidChars = stringFromHeader.filter((s) => !stringContainsInvalidCharsOnly(s));
    const formatted = withoutOnlyInvalidChars.map((s) => removeInvalidChars(s));
    const [firstName, lastName] = formatted;
    return {
      firstName: firstName || '',
      lastName: lastName || '',
    };
  }
}
