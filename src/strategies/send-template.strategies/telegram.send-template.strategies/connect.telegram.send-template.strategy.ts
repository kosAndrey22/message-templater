
import {
  SendTemplateResult,
  SendTemplateStrategy,
} from '../../../interfaces';

export class ConnectTenegramSendTemplateStrategy implements SendTemplateStrategy {

  constructor() {}

  public async send(): Promise<SendTemplateResult> {
    const result: SendTemplateResult = {
      errors: [
        'Connect feature does not support Telegram',
      ],
    };

    return result;
  }

}
