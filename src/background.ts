import { TAB_STATUS } from './constants';
import {
  addPageEventListener,
  executeScriptOnActiveTabOnce,
  getActiveTab,
  getTabById,
  isResendTemplateIfRedirectedEvent,
  sleep,
} from './helpers';
import { BasePageEvent, ResendTemplateIfRedirectedPageEvent } from './interfaces';

const listener = async <Event extends BasePageEvent>(event: Event): Promise<void> => {
  if (isResendTemplateIfRedirectedEvent(event)) {
    await processResendTemplateIfRedirectedEvent(event);
  }
};

const processResendTemplateIfRedirectedEvent = async (
  resendEvent: ResendTemplateIfRedirectedPageEvent<BasePageEvent>,
): Promise<void> => {
  const activeTab = await getActiveTab();
  let tabStatus = activeTab.status;
  const tabId = activeTab.id;
  if (tabStatus === TAB_STATUS.LOADING) {
    while (tabStatus === TAB_STATUS.LOADING) {
      await sleep(500);
      const tab = await getTabById(tabId);
      tabStatus = tab?.status;
    }
    const { event } = resendEvent;
    executeScriptOnActiveTabOnce({ ...event, resended: true });
  }
};

addPageEventListener(listener);
