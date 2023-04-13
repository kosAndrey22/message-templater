import { Template } from '.';

export interface SendTemplateResult {
  warnings?: string[];
  errors?: string[];
}

export interface SendTemplateStrategy {
  send(template: Template): Promise<SendTemplateResult>;
}
