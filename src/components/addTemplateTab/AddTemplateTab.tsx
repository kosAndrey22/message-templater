import React, { ChangeEvent, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { PLACEHOLDER } from '../../constants';
import { saveNewTemplate } from '../../helpers';
import './AddTemplateTab.scss';

export const AddTemplateTab = (): JSX.Element => {
  const [templateText, setTemplateText] = useState('');
  const [templateTitle, setTemplateTitle] = useState('');

  const onTitleInputChange = <E extends ChangeEvent<HTMLInputElement>>(e: E): void => {
    setTemplateTitle(e.target.value);
  };
  const onTextInputChange = <E extends ChangeEvent<HTMLTextAreaElement>>(e: E): void => {
    setTemplateText(e.target.value);
  };

  const onSave = (): void => {
    saveNewTemplate({ title: templateTitle, text: templateText });
    setTemplateTitle('');
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
              <p>
                <b>{PLACEHOLDER.FIRST_NAME}</b> - first name of the user
              </p>
              <p>
                <b>{PLACEHOLDER.LAST_NAME}</b> - last name of the user
              </p>
              <p>
                <b>{PLACEHOLDER.FULL_NAME}</b> - Shortcut of {`{${PLACEHOLDER.FIRST_NAME}}`} {`{${PLACEHOLDER.LAST_NAME}}`}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='new-template-container'>
        <div className='form'>
          <input
            placeholder='Title'
            value={templateTitle}
            onChange={(e): void => onTitleInputChange(e)}
          />
          <textarea
            placeholder='Template Text'
            value={templateText}
            onChange={(e): void => onTextInputChange(e)}
          />
          <button
            disabled={(!templateTitle) || (!templateText)}
            onClick={(): void => onSave()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
