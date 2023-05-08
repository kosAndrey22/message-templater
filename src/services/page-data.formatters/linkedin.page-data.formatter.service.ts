import { PLACEHOLDER } from '../../constants';
import { removeInvalidChars, stringContainsInvalidCharsOnly } from '../../helpers';
import { PageInfo } from '../../types';
import { AbstractPageDataFormatterService } from './abstract.page-data.formatter.service';

export class LinkedinPageDataFormatterService extends AbstractPageDataFormatterService {
  public formatFullNameHeaderContent(
    content: string,
  ): Partial<Pick<PageInfo, PLACEHOLDER.FIRST_NAME | PLACEHOLDER.LAST_NAME>> {
    const stringFromHeader = content.split(' ');
    const withoutOnlyInvalidChars = stringFromHeader.filter((s) => !stringContainsInvalidCharsOnly(s));
    const formatted = withoutOnlyInvalidChars.map((s) => removeInvalidChars(s));
    const [firstName, lastName] = formatted;
    return { firstName, lastName };
  }
}
