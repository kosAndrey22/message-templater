import {
  removeInvalidChars,
  setFirstAndAfterSpecialCharsLettersToUpperCase,
  stringContainsInvalidCharsOnly,
} from '../../../helpers';
import { PageInfo } from '../../../types';
import { BasePageDataFormatterStrategy } from '../base.page-data.formatter.strategy';

export class TelegramPageDataFormatterStrategy extends BasePageDataFormatterStrategy {
  public formatFullNameHeaderContent(content: string): Partial<PageInfo> {
    const stringFromHeader = content.split(' ');
    const withoutOnlyInvalidChars = stringFromHeader.filter((s) => !stringContainsInvalidCharsOnly(s));
    const formatted = withoutOnlyInvalidChars.map((s) => removeInvalidChars(s));
    if (formatted.length === 1) {
      return {
        firstName: setFirstAndAfterSpecialCharsLettersToUpperCase(formatted[0]),
        lastName: setFirstAndAfterSpecialCharsLettersToUpperCase(formatted[0]),
        fullName: setFirstAndAfterSpecialCharsLettersToUpperCase(formatted[0]),
      };
    }

    const [firstName, lastName] = formatted;
    return {
      firstName: setFirstAndAfterSpecialCharsLettersToUpperCase(firstName),
      lastName: setFirstAndAfterSpecialCharsLettersToUpperCase(lastName),
    };
  }
}
