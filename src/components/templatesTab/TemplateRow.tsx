import React, { useEffect, useState } from 'react';
import { MESSAGE_TYPE } from '../../constants';
import { Template } from '../../interfaces';

type TemplateRowProps = {
  template: Template;
  deleteTemplate: (id: number) => (void | Promise<void>);
  sendTemplate: (messageType: MESSAGE_TYPE, template: Template) => (void | Promise<void>);
};

export const TemplateRow = ({ template, deleteTemplate, sendTemplate }: TemplateRowProps): JSX.Element => {
  const [templateData, setTemplateData] = useState<Template>();
  useEffect(() => {
    setTemplateData(template);
  }, []);

  const connect = (): void => {
    sendTemplate(MESSAGE_TYPE.CONNECT_MESSAGE, templateData);
  };

  const deleteCurrentTemplate = (): void => {
    deleteTemplate(template.id);
  };

  // const send = (): void => {
  //   sendTemplate(MESSAGE_TYPE.NORMAL_MESSAGE, templateData);
  // };

  return (
    <div className='template'>
      <b>{templateData?.title ?? ''}</b>
      <span>{templateData?.text ?? ''}</span>
      <div className='buttons'>
        <button onClick={(): void => connect()}>
          Connect
        </button>
        {/* <button onClick={(): void => send()}>
          Send
        </button> */}
        <button onClick={(): void => deleteCurrentTemplate()}>
          Delete
        </button>
      </div>
    </div>
  );
};
