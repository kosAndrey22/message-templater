import { MESSAGE_TYPE } from '../constants';
import { Template } from '../interfaces';
import { LinkedinSendTemplateStrategy, MockReceivePageInfoStrategy } from '../strategies';

export const sendMessage = (messageType: MESSAGE_TYPE, template: Template): void => {
  const str = new LinkedinSendTemplateStrategy(new MockReceivePageInfoStrategy());
  str.send(template);
};

