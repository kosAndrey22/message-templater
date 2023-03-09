import React, { ChangeEvent, useState } from 'react';
import { saveNewTemplate } from '../../helpers';
import './AddTemplateTab.scss';

export const AddTemplateTab = (): JSX.Element => {
  const [templateText, setTemplateText] = useState('');

  const onInputChange = <E extends ChangeEvent<HTMLTextAreaElement>>(e: E): void => {
    setTemplateText(e.target.value);
  };

  const onSave = (): void => {
    saveNewTemplate(templateText);
    setTemplateText('');
  };

  return (
    <div className='new-template-container'>
      <div className='form'>
        <textarea
          value={templateText}
          onChange={(e): void => onInputChange(e)}
        />
        <button
          onClick={(): void => onSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
};
