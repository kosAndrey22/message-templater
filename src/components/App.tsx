import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { executeScriptOnTab, findPageElementsById, getActiveTab } from '../helpers';
import { Popup } from './popup';

const bootstrap = async (): Promise<void> => {
  const activeTab = await getActiveTab();
  const popupElement = findPageElementsById('popup');
  ReactDOM.render(<Popup />, popupElement);
  executeScriptOnTab(activeTab.id, 'js/event_listener.js');
};

bootstrap();
