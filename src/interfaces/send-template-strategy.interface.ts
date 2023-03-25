import { Template } from '.';

export interface SendTemplateStrategy {
  send(template: Template): Promise<void>;
}
