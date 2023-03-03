import { PageInfo } from '../types';

export interface ReceivePageInfoStrategy {
  receive(): PageInfo
};
