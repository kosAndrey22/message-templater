import { setFirstAndAfterSpecialCharsLettersToUpperCase } from '../../helpers';
import { PageInfo } from '../../types';

export class BasePageDataFormatterStrategy {
  public formatPageInfo(pageInfo: PageInfo): PageInfo {
    const formattedInfo: PageInfo = {};
    if (pageInfo.firstName) {
      formattedInfo.firstName = setFirstAndAfterSpecialCharsLettersToUpperCase(pageInfo.firstName);
    }
    if (pageInfo.lastName) {
      formattedInfo.lastName = setFirstAndAfterSpecialCharsLettersToUpperCase(pageInfo.lastName);
    }
    if (formattedInfo.firstName && formattedInfo.lastName) {
      formattedInfo.fullName = `${formattedInfo.firstName} ${formattedInfo.lastName}`;
    }
    return formattedInfo;
  }
}
