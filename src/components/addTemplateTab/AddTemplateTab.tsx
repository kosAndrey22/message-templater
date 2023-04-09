import React, { ChangeEvent, useEffect, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { MAX_TEMPLATE_TITLE_LENGHT, PLACEHOLDER } from '../../constants';
import {
  addMouseEnterListener,
  addMouseOutListener,
  findPageElementById,
  isCursorInside,
  removeMouseEnterListener,
  removeMouseOutListener,
  saveNewTemplate,
} from '../../helpers';
import './AddTemplateTab.scss';

export const AddTemplateTab = (): JSX.Element => {
  const tooltipMarkId = 'info-tooltip-mark';
  const tooltipContainerId = 'tooltip-container';

  const [templateText, setTemplateText] = useState('');
  const [templateTitle, setTemplateTitle] = useState('');
  const [tooltipVisibility, setTooltipVisibility] = useState(false);

  const onTitleInputChange = <E extends ChangeEvent<HTMLInputElement>>(e: E): void => {
    setTemplateTitle(e.target.value);
  };
  const onTextInputChange = <E extends ChangeEvent<HTMLTextAreaElement>>(e: E): void => {
    setTemplateText(e.target.value);
  };

  const onSave = (): void => {
    saveNewTemplate({ title: templateTitle, text: templateText, pinned: false });
    setTemplateTitle('');
    setTemplateText('');
  };

  const onPlacehoderVariableClick = (placeholderVar: PLACEHOLDER): void => {
    const lastChar = templateText[templateText.length - 1];
    const messageEmpty = lastChar === undefined;
    const newStringStarted = lastChar === '\n';
    const spaceBeforeInserted = lastChar === ' ';
    const spaceBeforeRequired = !(messageEmpty || newStringStarted || spaceBeforeInserted);
    const varIndent = spaceBeforeRequired ? ' ' : '';
    setTemplateText(`${templateText}${varIndent}{${placeholderVar.toString()}}`);
    closeTooltip();
  };

  const closeTooltip = (): void => {
    const tooltipElement = findPageElementById(tooltipContainerId);
    if (!tooltipElement) {
      return;
    }
    setTooltipVisibility(false);
    removeMouseOutListener(tooltipElement, handleMouseOutTooltip);
  };

  const handleMouseEnterTooltip = (): void => {
    setTooltipVisibility(true);
    const tooltipElement = findPageElementById(tooltipContainerId);
    if (!tooltipElement) {
      return;
    }
    addMouseOutListener(tooltipElement, handleMouseOutTooltip);
  };

  const handleMouseOutTooltip = (): void => {
    const tooltipElement = findPageElementById(tooltipContainerId);
    if (!tooltipElement) {
      return;
    }
    const mouseInside = isCursorInside(tooltipElement);
    if (!mouseInside) {
      closeTooltip();
    }
  };

  useEffect(() => {
    const tooltipMarkElement = findPageElementById(tooltipMarkId);
    if (!tooltipMarkElement) {
      return;
    }
    addMouseEnterListener(tooltipMarkElement, handleMouseEnterTooltip);
    return (): void => {
      removeMouseEnterListener(tooltipMarkElement, handleMouseEnterTooltip);
    };
  }, []);

  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    visible: tooltipVisibility,
  });

  return (
    <>
      <div className="info-tooltip-mark-container">
        <p id={tooltipMarkId} className="info-tooltip-mark" ref={setTriggerRef} />
        {visible && (
          <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container', id: tooltipContainerId })}>
            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            <div id="info-tooltip" className="info-tooltip">
              <h4> Available variables: </h4>
              <p>
                <b
                  className="placeholder-variable"
                  onClick={(): void => onPlacehoderVariableClick(PLACEHOLDER.FIRST_NAME)}
                >
                  {PLACEHOLDER.FIRST_NAME}
                </b>
                - first name of the user
              </p>
              <p>
                <b
                  className="placeholder-variable"
                  onClick={(): void => onPlacehoderVariableClick(PLACEHOLDER.LAST_NAME)}
                >
                  {PLACEHOLDER.LAST_NAME}
                </b>
                - last name of the user
              </p>
              <p>
                <b
                  className="placeholder-variable"
                  onClick={(): void => onPlacehoderVariableClick(PLACEHOLDER.FULL_NAME)}
                >
                  {PLACEHOLDER.FULL_NAME}
                </b>
                - Shortcut of {`{${PLACEHOLDER.FIRST_NAME}}`} {`{${PLACEHOLDER.LAST_NAME}}`}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="new-template-container">
        <div className="form">
          <input
            placeholder="Title"
            value={templateTitle}
            onChange={(e): void => onTitleInputChange(e)}
            maxLength={MAX_TEMPLATE_TITLE_LENGHT}
          />
          <textarea placeholder="Template Text" value={templateText} onChange={(e): void => onTextInputChange(e)} />
          <button disabled={!templateTitle || !templateText} onClick={(): void => onSave()}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};
