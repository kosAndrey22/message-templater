import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addDocumentDomLoadListener, findPageElementById } from '../helpers';
import { Popup } from './popup';

const bootstrap = (): void => {
  const popupElement = findPageElementById('popup');
  ReactDOM.render(<Popup />, popupElement);
};

addDocumentDomLoadListener(bootstrap);
