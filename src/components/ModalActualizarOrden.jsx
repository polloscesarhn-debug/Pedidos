import React from 'react';
import './ModalActualizarOrden.css';

export default function ModalActualizarOrden({ open, pedido, onClose, onPreparado }) {
  if (!open) return null;
  return (
    <div className="modal-orden-bg">
      <div className="modal-orden">
        <h2>Actualizar orden</h2>
        <p>¿El pedido #{pedido.id} ya está preparado?</p>
        <div className="modal-orden-btns">
          <button className="btn-preparado" onClick={onPreparado}>Ya está preparado</button>
          <button className="btn-cerrar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
