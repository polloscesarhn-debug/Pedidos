import React from 'react';
import './PedidoCard.css';

export default function PedidoCard({ pedido }) {
  return (
    <div className="pedido-card">
      <h3>Pedido #{pedido.id}</h3>
      <p><strong>Cliente:</strong> {pedido.cliente}</p>
      <div className="productos-lista">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem'}}>
          <strong style={{color:'#d90429'}}>Producto</strong>
          <strong style={{color:'#d90429'}}>Cantidad</strong>
        </div>
        <ul>
          {pedido.pedido.map((item, idx) => (
            <li key={idx} style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
              <span>{item.producto}</span>
              <span className="linea-producto"></span>
              <span className="cantidad">{item.cantidad}</span>
            </li>
          ))}
        </ul>
      </div>
      <p><strong>Orden:</strong> {pedido.orden}</p>
    </div>
  );
}
