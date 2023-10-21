import { Template } from '.';

export interface SendTemplateResult {
  warnings?: string[];
  errors?: string[];
}

export interface SendOptions {
  tryWaitForElementsRender: boolean
}

export interface SendTemplateStrategy {
  send(template: Template, options?: SendOptions): SendTemplateResult | Promise<SendTemplateResult>;
}
