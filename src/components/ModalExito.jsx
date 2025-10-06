import React from 'react';
import './ModalExito.css';

export default function ModalExito({ open, message }) {
  if (!open) return null;
  return (
    <div className="modal-exito-bg">
      <div className="modal-exito">
        <span role="img" aria-label="check" style={{fontSize:'2.5rem'}}>✅</span>
        <h3>{message || '¡Actualizado con éxito!'}</h3>
      </div>
    </div>
  );
}
