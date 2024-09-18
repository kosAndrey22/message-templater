import { PageInfo } from '../../types';

export class BasePageDataFormatterStrategy {
  public formatPageInfo(pageInfo: PageInfo): PageInfo {
    const formattedInfo: PageInfo = {};
    if (pageInfo.firstName) {
      formattedInfo.firstName = pageInfo.firstName;
    }
    if (pageInfo.lastName) {
      formattedInfo.lastName = pageInfo.lastName;
    }

    if (pageInfo.fullName) {
      formattedInfo.fullName = pageInfo.fullName;
    } else if (formattedInfo.firstName && formattedInfo.lastName) {
      formattedInfo.fullName = `${formattedInfo.firstName} ${formattedInfo.lastName}`;
    }
    return formattedInfo;
  }
}
