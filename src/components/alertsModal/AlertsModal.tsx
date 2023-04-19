import React from 'react';
import Modal from 'react-modal';
import './AlertsModal.scss';

type AlertsModalProps = {
  visible: boolean;
  warnings: string[];
  errors: string[];
  closeModal: () => void;
};

export const AlertsModal = ({ visible, warnings, errors, closeModal }: AlertsModalProps): JSX.Element => {
  const renderErrors = (errors: string[]): JSX.Element => {
    return errors.length ? (
      <div className="errors">
        <h4 className="errors-header">We've got a problem here:</h4>
        <ul className="error-el">
          {errors.map((e) => (
            <li>{e}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };
  const renderWarnings = (warnings: string[]): JSX.Element => {
    return warnings.length ? (
      <div className="warnings">
        <h4 className="warnings-header">We've got an error here:</h4>
        <ul>
          {warnings.map((w) => (
            <li className="warn-el">{w}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  return (
    <Modal isOpen={visible}>
      <div className="alerts-modal-content">
        {renderErrors(errors)}
        {renderWarnings(warnings)}
        <button className="close-btn" onClick={(): void => closeModal()}>
          Close
        </button>
      </div>
    </Modal>
  );
};
