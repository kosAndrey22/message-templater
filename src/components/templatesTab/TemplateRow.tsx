import React, { useEffect, useState } from 'react';
import { MESSAGE_TYPES } from '../../constants';
import { Template } from '../../interfaces';

type TemplateRowProps = {
  template: Template;
  deleteTemplate: (id: number) => (void | Promise<void>);
  sendTemplate: (messageType: MESSAGE_TYPES, template: Template) => (void | Promise<void>);
};

export const TemplateRow = ({ template, deleteTemplate, sendTemplate }: TemplateRowProps): JSX.Element => {
  const [templateData, setTemplateData] = useState<Template>();
  useEffect(() => {
    setTemplateData(template);
  }, []);

  const connect = (): void => {
    sendTemplate(MESSAGE_TYPES.CONNECT_MESSAGE, templateData);
  };

  const deleteCurrentTemplate = (): void => {
    deleteTemplate(template.id);
  };

  const send = (): void => {
    sendTemplate(MESSAGE_TYPES.NORMAL_MESSAGE, templateData);
  };

  return (
    <div>
      {templateData?.text ?? ''}
      <button onClick={(): void => connect()}>
        Connect
      </button>
      <button onClick={(): void => send()}>
        Send
      </button>
      <button onClick={(): void => deleteCurrentTemplate()}>
        Delete
      </button>
    </div>
  );
};
