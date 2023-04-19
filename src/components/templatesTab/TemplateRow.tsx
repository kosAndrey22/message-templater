import React, { ChangeEvent, useEffect, useState } from 'react';
import { MAX_TEMPLATE_TITLE_LENGHT, MESSAGE_TYPE } from '../../constants';
import { Template } from '../../interfaces';

type TemplateRowProps = {
  template: Template;
  deleteTemplate: (id: number) => void | Promise<void>;
  updateTemplate: (templateId: number, updateData: Partial<Template>) => void | Promise<void>;
  sendTemplate: (messageType: MESSAGE_TYPE, template: Template) => void | Promise<void>;
};

export const TemplateRow = ({
  template,
  deleteTemplate,
  updateTemplate,
  sendTemplate,
}: TemplateRowProps): JSX.Element => {
  const [templateData, setTemplateData] = useState<Template>();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('');
  const [pinned, setPinned] = useState<boolean>(template.pinned);

  useEffect(() => {
    setTemplateData(template);
  }, []);

  const turnEditModeOn = (): void => {
    setEditedTitle(templateData.title);
    setEditedText(templateData.text);
    setEditMode(true);
  };

  const turnEditModeOff = (): void => {
    setEditMode(false);
  };

  const renderInWatchMode = (): JSX.Element => {
    const changePinStatus = (): void => {
      const newPinStatus = !pinned;
      setPinned(newPinStatus);
      updateTemplate(template.id, { pinned: newPinStatus });
    };

    const connect = (): void => {
      sendTemplate(MESSAGE_TYPE.CONNECT_MESSAGE, templateData);
    };

    const send = (): void => {
      sendTemplate(MESSAGE_TYPE.NORMAL_MESSAGE, templateData);
    };

    const deleteCurrentTemplate = (): void => {
      deleteTemplate(template.id);
    };

    return (
      <>
        <div className="template-header">
          <b>{templateData?.title ?? ''}</b>
          <div className="edit-icon" onClick={(): void => turnEditModeOn()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </div>
          <div className="delete-icon" onClick={(): void => deleteCurrentTemplate()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </div>
          <div className={`pin-icon${pinned ? '--pinned' : ''}`} onClick={(): void => changePinStatus()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z" />
            </svg>
          </div>
        </div>
        <span>{templateData?.text ?? ''}</span>
        <div className="buttons">
          <button onClick={(): void => connect()}>Connect</button>
          <button onClick={(): void => send()}>Send</button>
        </div>
      </>
    );
  };

  const renderInEditMode = (): JSX.Element => {
    const onTitleInputChange = <E extends ChangeEvent<HTMLInputElement>>(e: E): void => {
      setEditedTitle(e.target.value);
    };
    const onTextInputChange = <E extends ChangeEvent<HTMLTextAreaElement>>(e: E): void => {
      setEditedText(e.target.value);
    };

    const updateCurrentTemplate = (): void => {
      const updatedTemplateData = {
        title: editedTitle,
        text: editedText,
      };
      turnEditModeOff();
      setTemplateData({
        ...templateData,
        ...updatedTemplateData,
      });
      updateTemplate(template.id, updatedTemplateData);
    };

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
