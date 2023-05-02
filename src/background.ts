import { addPageEventListener, getActiveTab } from './helpers';

const listener = async () => {
  console.log('bbb');
  const tabs = await new Promise((resolve) => {
    chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
      resolve(tabs);
    });
  });
  console.log(1, JSON.stringify(tabs));
  const tab = await getActiveTab();
  console.log(1, tab);
};

addPageEventListener(() => listener());
