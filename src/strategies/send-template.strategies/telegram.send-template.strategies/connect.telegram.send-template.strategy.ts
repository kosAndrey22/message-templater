import { SendTemplateResult, SendTemplateStrategy } from '../../../interfaces';

export class ConnectTenegramSendTemplateStrategy implements SendTemplateStrategy {
  public send(): SendTemplateResult {
    const result: SendTemplateResult = {
      errors: ['Connect feature does not support Telegram'],
    };

    return result;
  }
}
