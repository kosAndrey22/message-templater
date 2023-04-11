import { PageInfo } from '../../types';
import { AbstractReceivePageStrategy } from './abstract.receive-page-info.strategy';

export class MockReceivePageInfoStrategy extends AbstractReceivePageStrategy {
  protected receiveInfo(): PageInfo {
    return {
      firstName: 'aboba',
      lastName: 'pavlovich',
      fullName: 'aboba pavlovich',
    };
  }
}
