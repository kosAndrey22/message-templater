import React, { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AddTemplateTab } from '../addTemplateTab';
import { TemplatesTab } from '../templatesTab';
import './Popup.scss';

export const Popup = (): JSX.Element => {
  useEffect((): void => {
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div style={{ width: 400, height: 600 }}>
      <Tabs>
        <TabList>
          <Tab>Templates</Tab>
          <Tab>Add Template</Tab>
        </TabList>

        <TabPanel>
          <TemplatesTab />
        </TabPanel>
        <TabPanel>
          <AddTemplateTab />
        </TabPanel>
      </Tabs>
    </div>
  );
};
