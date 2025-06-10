import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InserirNome = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const roomCode = localStorage.getItem('roomCode');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert('Por favor, insira um nome de usuário.');
      return;
    }

    // Armazena o nome do jogador localmente
    localStorage.setItem('playerName', username);

    // Redireciona diretamente para a próxima etapa
    navigate('/gerar-sala');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#022894] text-white">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Insira um nome para seu usuário</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ex: Jogador123"
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-[#022894] text-white w-full py-2 rounded-lg hover:bg-[#011f6d]"
        >
          Jogar!
        </button>
      </form>
    </div>
  );
};

export default InserirNome;
