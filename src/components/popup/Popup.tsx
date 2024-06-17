import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { addPageEventListener, closeWindow, isSendTemplateResultEvent, removePageEventListener } from '../../helpers';
import { BasePageEvent } from '../../interfaces';
import { AddTemplateTab } from '../add-template-tab';
import { AlertsModal } from '../alerts-modal';
import { TemplatesTab } from '../templates-tab';
import './Popup.scss';

type AlertsModalCallback = () => () => void;

export const Popup = (): JSX.Element => {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  const defaultCloseAlertsModalCallback: AlertsModalCallback = () => () => {};
  const [alertsModalVisibility, setAlertsModalVisibilty] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [closeAlertsModalCallback, setCloseAlertsModalCallback] = useState<() => () => void>(
    defaultCloseAlertsModalCallback,
  );

  const closeAlertsModal = (): void => {
    setErrors([]);
    setWarnings([]);
    setAlertsModalVisibilty(false);
    closeAlertsModalCallback();
    setCloseAlertsModalCallback(defaultCloseAlertsModalCallback);
  };

  const openAlertsModal = (e: string[], w: string[]): void => {
    setErrors(e);
    setWarnings(w);
    setAlertsModalVisibilty(true);
  };

  useEffect(() => {
    const sendTemplateResultListener = <Event extends BasePageEvent>(event: Event): void => {
      if (!isSendTemplateResultEvent(event)) {
        return;
      }
      const {
        result: { errors: resultErrors, warnings: resultWarnings },
      } = event;
      const errorsExists = resultErrors && resultErrors.length;
      const warningsExists = resultWarnings && resultWarnings.length;
      if (errorsExists || warningsExists) {
        openAlertsModal(resultErrors || [], resultWarnings || []);
        setCloseAlertsModalCallback(() => () => {
          // closeWindow(); // TODO: Made it configurable to close window or not afterclosing modal
        });
      } else {
        closeWindow();
      }
    };
    addPageEventListener(sendTemplateResultListener);
    return (): void => {
      removePageEventListener(sendTemplateResultListener);
    };
  }, []);

  return (
    <div className="app">
      <Tabs>
        <TabList>
          <div className="tab-switcher">
            <Tab>
              <div className="tab-switcher__tab-button">Templates</div>
            </Tab>
            <Tab>
              <div className="tab-switcher__tab-button">Add Template</div>
            </Tab>
          </div>
        </TabList>

        <TabPanel>
          <TemplatesTab />
        </TabPanel>
        <TabPanel>
          <AddTemplateTab />
        </TabPanel>
      </Tabs>

      <div className="version-info">
        < hr />
        <div className="version">
          Version: 1.1.1
        </div>
      </div>
      <AlertsModal visible={alertsModalVisibility} errors={errors} warnings={warnings} closeModal={closeAlertsModal} />
    </div>
  );
};
