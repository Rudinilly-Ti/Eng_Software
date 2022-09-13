import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './styles.scss';

type Props = {
  title: string;
  children: JSX.Element;
  show: boolean;
  onClose(): void;
};

const GenericModal = ({ title, children, show, onClose }: Props) => {
  return (
    <div className={`modal-bg ${show ? 'modal-on' : 'modal-off'}`}>
      <div className="modal">
        <div className="close-modal-button">
          <FontAwesomeIcon
            onClick={onClose}
            className="close-icon"
            icon={solid('xmark')}
          />
        </div>
        <div className="modal-title">
          <h4>{title}</h4>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default GenericModal;
