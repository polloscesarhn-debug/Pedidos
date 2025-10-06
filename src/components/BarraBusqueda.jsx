import React, { useState } from "react";
import "./BarraBusqueda.css";

const BarraBusqueda = ({ onBuscar }) => {
  const [valor, setValor] = useState("");

  const manejarCambio = (e) => {
    setValor(e.target.value);
    if (onBuscar) {
      onBuscar(e.target.value);
    }
  };

  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="Buscar..."
        value={valor}
        onChange={manejarCambio}
      />
    </div>
  );
};

export default BarraBusqueda;
