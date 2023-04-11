import { onlyFirstLetterToUpper } from '../../helpers';
import { ReceivePageInfoStrategy } from '../../interfaces';
import { PageInfo } from '../../types';

export abstract class AbstractReceivePageStrategy implements ReceivePageInfoStrategy {
  protected abstract receiveInfo(): PageInfo;

  protected formatPageInfo(pageInfo: PageInfo): PageInfo {
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

  public receive(): PageInfo {
    const pageInfo = this.receiveInfo();
    const formattedPageInfo = this.formatPageInfo(pageInfo);
    return formattedPageInfo;
  }
}
