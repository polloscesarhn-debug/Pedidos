import usePedidos from './hooks/usePedidos';
import React from 'react';
import ContadorPedidos from './components/ContadorPedidos';
import PedidoCard from './components/PedidoCard';
import ModalActualizarOrden from './components/ModalActualizarOrden';
import ModalExito from './components/ModalExito';
export default function App() {
  const logo = '/logo.jpeg';
  const { pedidos, loading, error, refetch } = usePedidos();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = React.useState(null);
  const [modalExitoOpen, setModalExitoOpen] = React.useState(false);
  const [exitoMsg, setExitoMsg] = React.useState('');
  const [mostrarPreparados, setMostrarPreparados] = React.useState(false);

  const handleCardClick = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPedidoSeleccionado(null);
  };

  const handlePreparado = async () => {
    if (!pedidoSeleccionado) return;
    try {
      const estado = "PREPARADO";
      const url = `https://script.google.com/macros/s/AKfycbxpRoqeOYky4zCmgsByaycIb8CA5m4PRd9O_ElmqgSDfWEpfo4srDSwQzYROOax3CeRIg/exec?id=${pedidoSeleccionado.id}&estado=${estado}`;
      const res = await fetch(url);
      const data = await res.json();
      setExitoMsg(data.message || '¡Actualizado con éxito!');
      setModalExitoOpen(true);
      setTimeout(() => {
        setModalExitoOpen(false);
        handleCloseModal();
        refetch && refetch();
      }, 500);
    } catch (err) {
      console.error("Error detallado:", err);
      setExitoMsg('Error al actualizar el pedido');
      setModalExitoOpen(true);
      setTimeout(() => {
        setModalExitoOpen(false);
        handleCloseModal();
      }, 1000);
    }
  };

  return (
    <div className="app-bg">
      <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
          <ContadorPedidos total={pedidos.filter(p => p.orden === 'ORDENADO').length} />
          <button
            style={{
              marginTop: '1rem',
              padding: '0.7rem 1.5rem',
              background: '#d90429',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #d9042922'
            }}
            onClick={() => setMostrarPreparados(prev => !prev)}
          >
            {mostrarPreparados ? 'Ver pedidos ordenados' : 'Pedidos preparados'}
          </button>
        </div>
        <button
          style={{
            marginTop: '0.5rem',
            padding: '0.7rem 1.5rem',
            background: '#ffe066',
            color: '#d90429',
            border: '2px solid #d90429',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #d9042922'
          }}
          onClick={() => refetch && refetch()}
        >
          Actualizar
        </button>
      </div>
      <header className="app-header">
        <img src={logo} alt="Logo Pollos Cesar #2" className="app-logo" />
        <h1>Pollos Cesar #2</h1>
      </header>
      {loading && <p className="app-loading">Cargando pedidos...</p>}
      {error && <p className="app-error">Error al cargar pedidos</p>}
      <div className="cards-container">
        {mostrarPreparados
          ? (() => {
              const preparados = pedidos.filter(p => p.orden === 'PREPARADO');
              if (preparados.length === 0) return <p style={{color:'#d90429'}}>No hay pedidos preparados.</p>;
              const ultimo = preparados[preparados.length - 1];
              return (
                <div key={ultimo.id} style={{cursor:'pointer'}}>
                  <PedidoCard pedido={ultimo} />
                </div>
              );
            })()
          : [...pedidos].filter(p => p.orden === 'ORDENADO').sort((a,b)=>a.id.localeCompare(b.id)).map(pedido => (
              <div key={pedido.id} onClick={() => handleCardClick(pedido)} style={{cursor:'pointer'}}>
                <PedidoCard pedido={pedido} />
              </div>
            ))
        }
      </div>
      <ModalActualizarOrden
        open={modalOpen}
        pedido={pedidoSeleccionado || {id: ''}}
        onClose={handleCloseModal}
        onPreparado={handlePreparado}
      />
      <ModalExito open={modalExitoOpen} message={exitoMsg} />
    </div>
  );
}
