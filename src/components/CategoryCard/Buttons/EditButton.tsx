import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './buttons.scss';
import GenericModal from '../../GenericModal';
import FinallyButton from './FinallyButton';

const EditButton = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const closeModal = () => {
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
  };

  return (
    <>
      <div className="container">
        <button type="button" className="buttonss">
          <FontAwesomeIcon
            icon={solid('pen')}
            size="sm"
            onClick={openModal}
            type="button"
          />
        </button>
      </div>

      <GenericModal
        onClose={closeModal}
        show={modalStatus}
        title="Editar Categoria"
      >
        <div className="categoryContainer">
          Nova Categoria:
          <input type="text" />
          <div className="finally">
            <FinallyButton />
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default EditButton;
