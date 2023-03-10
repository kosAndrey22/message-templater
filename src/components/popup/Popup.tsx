import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AddTemplateTab } from '../addTemplateTab';
import { TemplatesTab } from '../templatesTab';
import './Popup.scss';

export const Popup = (): JSX.Element => {
  return (
    <div className='app'>
      <Tabs>
        <TabList>
          <div className='tab-switcher'>
            <Tab><div className='tab-switcher__tab-button'>Templates</div></Tab>
            <Tab><div className='tab-switcher__tab-button'>Add Template</div ></Tab>
          </div>
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
