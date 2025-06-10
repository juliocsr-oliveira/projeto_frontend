import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InserirCodigoSala = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roomCode) {
      alert('Por favor, insira o código da sala.');
      return;
    }

    // Simula sucesso sem consultar o back-end
    localStorage.setItem('roomCode', roomCode);
    navigate('/inserir-nome');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#022894] text-white">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Insira o código da sala</h1>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Ex: ABC123"
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-[#022894] text-white w-full py-2 rounded-lg hover:bg-[#011f6d]"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default InserirCodigoSala;
