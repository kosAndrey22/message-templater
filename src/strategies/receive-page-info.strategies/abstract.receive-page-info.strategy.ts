import { ReceivePageInfoStrategy } from '../../interfaces';
import { AbstractPageDataFormatterService } from '../../services';
import { PageInfo } from '../../types';

export abstract class AbstractReceivePageStrategy implements ReceivePageInfoStrategy {
  protected abstract receiveInfo(): PageInfo;
  protected abstract readonly pageDataFormatterService: AbstractPageDataFormatterService;

  public receive(): PageInfo {
    const pageInfo = this.receiveInfo();
    const formattedPageInfo = this.pageDataFormatterService.formatPageInfo(pageInfo);
    return formattedPageInfo;
  }
}
