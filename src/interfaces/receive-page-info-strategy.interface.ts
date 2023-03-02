import { PageInfo } from '../types';

export interface ReceivePageInfoStrategy {
  receive(): Promise<PageInfo>
};
