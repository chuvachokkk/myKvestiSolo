import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ErrorToast = ({ show, onClose, message }) => {
  return (
    <ToastContainer position="middle-center" className="p-3">
      <Toast show={show} onClose={onClose} delay={5000} autohide>
        <Toast.Header closeButton>
          <strong className="me-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorToast;
