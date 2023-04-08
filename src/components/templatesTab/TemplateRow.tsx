import React, { ChangeEvent, useEffect, useState } from 'react';
import { MAX_TEMPLATE_TITLE_LENGHT, MESSAGE_TYPE } from '../../constants';
import { updateTemplateById } from '../../helpers';
import { Template } from '../../interfaces';

type TemplateRowProps = {
  template: Template;
  deleteTemplate: (id: number) => void | Promise<void>;
  sendTemplate: (messageType: MESSAGE_TYPE, template: Template) => void | Promise<void>;
};

export const TemplateRow = ({ template, deleteTemplate, sendTemplate }: TemplateRowProps): JSX.Element => {
  const [templateData, setTemplateData] = useState<Template>();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');

  useEffect(() => {
    setTemplateData(template);
  }, []);

  const onTitleInputChange = <E extends ChangeEvent<HTMLInputElement>>(e: E): void => {
    setEditedTitle(e.target.value);
  };
  const onTextInputChange = <E extends ChangeEvent<HTMLTextAreaElement>>(e: E): void => {
    setEditedText(e.target.value);
  };

  const turnEditModeOn = (): void => {
    setEditedTitle(templateData.title);
    setEditedText(templateData.text);
    setEditMode(true);
  };

  const turnEditModeOff = (): void => {
    setEditMode(false);
  };

  const deleteCurrentTemplate = (): void => {
    deleteTemplate(template.id);
  };

  const updateCurrentTemplate = (): void => {
    const updatedTemplateData = {
      title: editedTitle,
      text: editedText,
    };
    updateTemplateById(template.id, updatedTemplateData);
    turnEditModeOff();
    setTemplateData({
      ...templateData,
      ...updatedTemplateData,
    });
  };

  const connect = (): void => {
    sendTemplate(MESSAGE_TYPE.CONNECT_MESSAGE, templateData);
  };

  // const send = (): void => {
  //   sendTemplate(MESSAGE_TYPE.NORMAL_MESSAGE, templateData);
  // };

  const renderInWatchMode = (): JSX.Element => {
    return (
      <>
        <div className="template-header">
          <b>{templateData?.title ?? ''}</b>
          <div className="edit-icon" onClick={(): void => turnEditModeOn()} />
        </div>
        <span>{templateData?.text ?? ''}</span>
        <div className="buttons">
          <button onClick={(): void => connect()}>Connect</button>
          {/* <button onClick={(): void => send()}>
          Send
        </button> */}
          <button onClick={(): void => deleteCurrentTemplate()}>Delete</button>
        </div>
      </>
    );
  };

  const renderInEditMode = (): JSX.Element => {
    return (
      <>
        <div className="template-header">
          <input
            value={editedTitle}
            onChange={(e): void => onTitleInputChange(e)}
            maxLength={MAX_TEMPLATE_TITLE_LENGHT}
          />
        </div>
        <textarea value={editedText} onChange={(e): void => onTextInputChange(e)} />
        <div className="buttons">
          <button disabled={!editedText || !editedTitle} onClick={(): void => updateCurrentTemplate()}>
            Save
          </button>
          <button onClick={(): void => turnEditModeOff()}>Cancel</button>
        </div>
      </>
    );
  };

  return <div className="template">{editMode ? renderInEditMode() : renderInWatchMode()}</div>;
};
