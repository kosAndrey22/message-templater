import { addPageEventListener, removePageEventListener } from '../helpers';
import { BasePageEvent } from '../interfaces';
import { mainEventListener } from '../page-event-listeners';

const listener = <Event extends BasePageEvent>(event: Event): void => {
  removePageEventListener(listener);
  mainEventListener(event);
};

addPageEventListener(listener);
