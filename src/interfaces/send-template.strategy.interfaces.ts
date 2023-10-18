import { Template } from '.';

export interface SendTemplateResult {
  warnings?: string[];
  errors?: string[];
}

export interface SendTemplateStrategy {
  send(template: Template, resended?: boolean): SendTemplateResult | Promise<SendTemplateResult>;
}
