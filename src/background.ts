import { TAB_STATUS } from './constants';
import { addPageEventListener, executeScriptOnActiveTabOnce, getActiveTab, getTabById, isResendTemplateIfRedirectedEvent, sleep } from './helpers';
import { BasePageEvent, ResendTemplateIfRedirectedPageEvent } from './interfaces';

const listener = async <Event extends BasePageEvent>(event: Event) => {
  if (isResendTemplateIfRedirectedEvent(event)) {
    processResendTemplateIfRedirectedEvent(event)
  }
};

const processResendTemplateIfRedirectedEvent = async (resendEvent: ResendTemplateIfRedirectedPageEvent<BasePageEvent>) => {
  const activeTab = await getActiveTab();
  let tabStatus = activeTab.status;
  let tabId = activeTab.id;
  if (tabStatus === TAB_STATUS.LOADING) {
    while (tabStatus === TAB_STATUS.LOADING) {
      await sleep(500);
      const tab = await getTabById(tabId);
      tabStatus = tab?.status;
    }
    const { event } = resendEvent;
    executeScriptOnActiveTabOnce({ ...event, resended: true })
  }
};

addPageEventListener(listener);
