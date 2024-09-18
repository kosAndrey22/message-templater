import { BasePageDataFormatterStrategy } from '../page-data-formattes.strategies';
import { PageInfo } from '../../types';
import { AbstractReceivePageStrategy } from './abstract.receive-page-info.strategy';

export class MockReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected pageDataFormatterService: BasePageDataFormatterStrategy = new BasePageDataFormatterStrategy();

  protected receiveInfo(): PageInfo {
    return {
      firstName: 'aboba',
      lastName: 'pavlovich',
      fullName: 'aboba pavlovich',
    };
  }
}
