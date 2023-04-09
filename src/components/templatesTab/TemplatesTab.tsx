import React, { useEffect, useState } from 'react';
import { MESSAGE_TYPE, PAGE_EVENT } from '../../constants';
import {
  getSavedTemplates,
  deleteTemplate as deleteTemplateFromStorage,
  sendPageEvent,
  closeWindow,
  updateTemplateById,
} from '../../helpers';
import { SendTemplatePageEvent, Template } from '../../interfaces';
import { TemplateRow } from './TemplateRow';
import './TemplatesTab.scss';

export const TemplatesTab = (): JSX.Element => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    getTemplates();
  });

  const getTemplates = async (): Promise<void> => {
    const savedTemplates = await getSavedTemplates();
    const sortedTemplates = sortTemplates(savedTemplates);
    const savedEqualToRendered = JSON.stringify(sortedTemplates) === JSON.stringify(templates);
    if (!savedEqualToRendered) {
      setTemplates(sortedTemplates);
    }
  };

  const sortTemplates = (templates: Template[]): Template[] => {
    return templates.sort((t1, t2) => Number(t2.pinned) - Number(t1.pinned) || t2.id - t1.id);
  };

  const sendTemplate = async (messageType: MESSAGE_TYPE, template: Template): Promise<void> => {
    const event: SendTemplatePageEvent = {
      template,
      messageType,
      type: PAGE_EVENT.SEND_MESSAGE,
    };
    await sendPageEvent(event);
    closeWindow();
  };

  const deleteTemplate = async (templateId: number): Promise<void> => {
    await deleteTemplateFromStorage(templateId);
    const templateToDeleteIndex = templates.findIndex((t) => t.id === templateId);
    const newTemplates = [...templates.slice(0, templateToDeleteIndex), ...templates.slice(templateToDeleteIndex + 1)];
    setTemplates(newTemplates);
  };

  const updateTemplate = async (templateId: number, updateData: Partial<Template>): Promise<void> => {
    await updateTemplateById(templateId, updateData);
    await getTemplates();
  };

  return (
    <div className="templates-container">
      {templates.length ? (
        templates.map((t) => (
          <div key={t.id}>
            <TemplateRow
              template={t}
              deleteTemplate={deleteTemplate}
              sendTemplate={sendTemplate}
              updateTemplate={updateTemplate}
            />
          </div>
        ))
      ) : (
        <span className="no-templates-msg"> No templates here </span>
      )}
    </div>
  );
};
