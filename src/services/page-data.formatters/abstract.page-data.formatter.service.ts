import { onlyFirstLetterToUpper } from '../../helpers';
import { PageInfo } from '../../types';

export class AbstractPageDataFormatterService {
  public formatPageInfo(pageInfo: PageInfo): PageInfo {
    const formattedInfo: PageInfo = {};
    if (pageInfo.firstName) {
      formattedInfo.firstName = onlyFirstLetterToUpper(pageInfo.firstName);
    }
    if (pageInfo.lastName) {
      formattedInfo.lastName = onlyFirstLetterToUpper(pageInfo.lastName);
    }
    if (formattedInfo.firstName && formattedInfo.lastName) {
      formattedInfo.fullName = `${formattedInfo.firstName} ${formattedInfo.lastName}`;
    }
    return formattedInfo;
  }
}
