// src/components/Modal.js
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
