import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WaitingRoom = ({ user }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/sala_espera/${gameId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    })
      .then(response => {
        setPlayers(response.data.players);
        setIsHost(response.data.host === user?.email);
      })
      .catch(error => console.error('Erro ao buscar sala de espera:', error));
  }, [gameId, user]);

  const handleStartGame = () => {
    axios.post(`http://127.0.0.1:8000/api/start-game/${gameId}/`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    })
      .then(() => navigate(`/play-kahoot/${gameId}`))
      .catch(error => console.error('Erro ao iniciar o jogo:', error));
  };

  // Simulação para testes: Redireciona automaticamente após 3 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`/play-kahoot/${gameId}`);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigate, gameId]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 text-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Sala de Espera</h1>
        <p className="text-center text-gray-700 mb-4">Compartilhe este código com os jogadores:</p>
        <p className="text-center text-2xl font-bold text-gray-900 bg-gray-200 py-2 px-4 rounded-lg mb-6">{gameId}</p>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Jogadores Conectados:</h2>
        <ul className="bg-gray-100 p-4 rounded-lg max-h-40 overflow-y-auto">
          {players.length > 0 ? (
            players.map((player, index) => (
              <li key={index} className="text-gray-900 font-semibold">{player.name}</li>
            ))
          ) : (
            <p className="text-gray-600">Aguardando jogadores...</p>
          )}
        </ul>
        {isHost && (
          <button 
            onClick={handleStartGame} 
            className="bg-green-500 text-white w-full py-2 mt-6 rounded-lg font-semibold hover:bg-green-600"
          >
            Iniciar Kahoot
          </button>
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;