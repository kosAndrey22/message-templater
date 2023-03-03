import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Popup } from './popup';

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  ReactDOM.render(<Popup />, document.getElementById('popup'));
  chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ['js/event_listener.js'] });
});
