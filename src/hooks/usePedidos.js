import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyDDD22PEc6yjgjcLVljAipAEBKsYHTAJS8';
const SHEET_ID = '1VCDeMqryes4qAfD4DFWyl2CPoBKp5yEkyLJ5MN0HD2U';
const RANGE = 'pedido';

function parsePedido(pedidoStr) {
  // Soporta PRODUCTO:...,CANTIDAD:... y PRODUCTO:...,CANTIDAD;...
  if (!pedidoStr) return [];
  // Unifica separadores ; y : para cantidad
  return pedidoStr.split(/,(?=PRODUCTO:)/).map(item => {
    const productoMatch = item.match(/PRODUCTO:([^,]+),CANTIDAD[:;](\d+)/);
    if (productoMatch) {
      return {
        producto: productoMatch[1].trim(),
        cantidad: productoMatch[2].trim()
      };
    }
    return null;
  }).filter(Boolean);
}

export default function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.values && data.values.length > 1) {
        const [headers, ...rows] = data.values;
        const pedidosData = rows.map(row => {
          const pedidoObj = {
            id: row[0],
            cliente: row[1],
            pedido: parsePedido(row[2]),
            orden: row[3]
          };
          return pedidoObj;
        });
        setPedidos(pedidosData);
      } else {
        setPedidos([]);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 15000);
    return () => clearInterval(interval);
  }, []);

  return { pedidos, loading, error, refetch: fetchPedidos };
}
