import { ReceivePageInfoStrategy } from '../../interfaces';
import { BasePageDataFormatterStrategy } from '../page-data-formattes.strategies';
import { PageInfo } from '../../types';

export abstract class AbstractReceivePageStrategy implements ReceivePageInfoStrategy {
  protected abstract receiveInfo(): PageInfo;
  protected abstract readonly pageDataFormatterService: BasePageDataFormatterStrategy;

  public receive(): PageInfo {
    const pageInfo = this.receiveInfo();
    const formattedPageInfo = this.pageDataFormatterService.buildPageInfo(pageInfo);
    return formattedPageInfo;
  }
}
