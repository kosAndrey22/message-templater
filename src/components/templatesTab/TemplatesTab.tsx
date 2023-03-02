import React, { useEffect, useState } from 'react';
import { MESSAGE_TYPES } from '../../constants';
import { getSavedTemplates, deleteTemplate as deleteTemplateFromStorage } from '../../helpers';
import { Template } from '../../interfaces';
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

  const sendTemplate = (messageType: MESSAGE_TYPES, template: Template): void => {
    messageType;
    template;
  };

  const deleteTemplate = async (templateId: number): Promise<void> => {
    await deleteTemplateFromStorage(templateId);
    const templateToDeleteIndex = templates.findIndex((t) => t.id === templateId);
    const newTemplates = [...templates.slice(0, templateToDeleteIndex), ...templates.slice(templateToDeleteIndex + 1)];
    setTemplates(newTemplates);
  };

  return (
    <div>
      {
        templates.map(
          (t) => <div key={t.id}>
            <TemplateRow
              template={t}
              deleteTemplate={deleteTemplate}
              sendTemplate={sendTemplate}
            />
          </div>,
        )
      }
    </div>
  );
};
