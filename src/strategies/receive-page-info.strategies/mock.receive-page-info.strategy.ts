import { ReceivePageInfoStrategy } from '../../interfaces';
import { PageInfo } from '../../types';

export class MockReceivePageInfoStrategy implements ReceivePageInfoStrategy {
  receive(): PageInfo {
    return {
      firstName: 'aboba',
      lastName: 'pavlovich',
    };
  }
}
