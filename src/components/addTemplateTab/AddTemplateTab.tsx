import React, { ChangeEvent, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
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

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <>
      <div className='info-tooltip-mark-container'>
        <p className='info-tooltip-mark' ref={setTriggerRef} />
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: 'tooltip-container' })}
          >
            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            <div className='info-tooltip'>
              <h4> Available variables: </h4>
              <p> {'{firstName} - first name of the user'} </p>
              <p> {'{lastName} - last name of the user'} </p>
            </div>
          </div>
        )}
      </div>
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
    </>
  );
};
