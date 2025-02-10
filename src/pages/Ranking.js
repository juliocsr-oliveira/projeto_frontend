import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Ranking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/resultado/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    })
      .then(response => setRanking(response.data))
      .catch(error => console.error('Erro ao buscar ranking:', error));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 text-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Ranking Final</h1>
        <ul className="space-y-4">
          {ranking.length > 0 ? (
            ranking.map((player, index) => (
              <li key={index} className={`p-4 rounded-lg text-lg font-semibold ${index === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-900'}`}>
                {index + 1}. {player.name} - {player.score} pontos
              </li>
            ))
          ) : (
            <p className="text-gray-700">Carregando ranking...</p>
          )}
        </ul>
        <button onClick={() => navigate('/')} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
          Voltar para a Página Principal
        </button>
      </div>
    </div>
  );
};

export default Ranking;