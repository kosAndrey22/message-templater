import React, { useEffect, useState } from 'react';
import { MESSAGE_TYPE, PAGE_EVENT } from '../../constants';
import { getSavedTemplates, deleteTemplate as deleteTemplateFromStorage, sendPageEvent } from '../../helpers';
import { SendTemplatePageEvent, Template } from '../../interfaces';
import { TemplateRow } from './TemplateRow';
import './TemplatesTab.scss';

export const TemplatesTab = (): JSX.Element => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const getTemplates = async (): Promise<void> => {
      const savedTemplates = await getSavedTemplates();
      const savedEqualToRendered = JSON.stringify(savedTemplates) === JSON.stringify(templates);
      if (!savedEqualToRendered) {
        setTemplates(savedTemplates);
      }
    };
    getTemplates();
  });

  const sendTemplate = (messageType: MESSAGE_TYPE, template: Template): void => {
    const event: SendTemplatePageEvent = {
      template,
      messageType,
      type: PAGE_EVENT.SEND_MESSAGE,
    };
    sendPageEvent(event);
  };

  const deleteTemplate = async (templateId: number): Promise<void> => {
    await deleteTemplateFromStorage(templateId);
    const templateToDeleteIndex = templates.findIndex((t) => t.id === templateId);
    const newTemplates = [...templates.slice(0, templateToDeleteIndex), ...templates.slice(templateToDeleteIndex + 1)];
    setTemplates(newTemplates);
  };

  return (
    <div className='templates-container'>
      {
        templates.length ? templates.map(
          (t) => <div key={t.id}>
            <TemplateRow
              template={t}
              deleteTemplate={deleteTemplate}
              sendTemplate={sendTemplate}
            />
          </div>,
        ) : <span className='no-templates-msg'> No templates here </span>
      }
    </div>
  );
};
