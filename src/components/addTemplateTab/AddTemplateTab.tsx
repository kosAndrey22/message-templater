import React, { ChangeEvent, useState } from 'react';
import { saveNewTemplate } from '../../helpers';
import './AddTemplateTab.scss';

export const AddTemplateTab = (): JSX.Element => {
  const [templateText, setTemplateText] = useState('');

  const onInputChange = <E extends ChangeEvent<HTMLInputElement>>(e: E): void => {
    setTemplateText(e.target.value);
  };

  const onSave = (): void => {
    saveNewTemplate(templateText);
    setTemplateText('');
  };

  return (
    <div>
      <input
        value={templateText}
        onChange={(e): void => onInputChange(e)}
      />
      <button
        onClick={(): void => onSave()}
      >
        Save
      </button>
    </div>
  );
};
