import { SendTemplateStrategy, Template } from '../../interfaces';

export class LinkedinSendTemplateStrategy implements SendTemplateStrategy {
  public send(template: Template): Promise<void> {
    template;
    return Promise.resolve();
  }
}
