import React from 'react';
import './ContadorPedidos.css';

export default function ContadorPedidos({ total }) {
  return (
    <div className="contador-card">
      <h2>Pedidos totales</h2>
      <div className="contador-numero">{total}</div>
    </div>
  );
}
