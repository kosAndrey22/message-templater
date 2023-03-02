import { ReceivePageInfoStrategy } from '../../interfaces';
import { PageInfo } from '../../types';

export class MockReceivePageInfoStrategy implements ReceivePageInfoStrategy {
  receive(): Promise<PageInfo> {
    return Promise.resolve({
      firstName: 'aboba',
      lastName: 'pavlovich',
    });
  }
}
