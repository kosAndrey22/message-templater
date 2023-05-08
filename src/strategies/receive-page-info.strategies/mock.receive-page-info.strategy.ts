import { AbstractPageDataFormatterService } from '../../services';
import { PageInfo } from '../../types';
import { AbstractReceivePageStrategy } from './abstract.receive-page-info.strategy';

export class MockReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected pageDataFormatterService: AbstractPageDataFormatterService = null;

  protected receiveInfo(): PageInfo {
    return {
      firstName: 'aboba',
      lastName: 'pavlovich',
      fullName: 'aboba pavlovich',
    };
  }
}
