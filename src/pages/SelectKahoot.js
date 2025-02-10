import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectKahoot = ({ user }) => {
  const navigate = useNavigate();

  // Mock de quizzes criados pelo usuário
  const [kahoots, setKahoots] = useState([
    { id: 1, title: 'Matemática Básica' },
    { id: 2, title: 'Ciências Naturais' },
    { id: 3, title: 'História Geral' }
  ]);

  const handleSelectKahoot = (kahootId) => {
    const gameId = Math.floor(100000 + Math.random() * 900000); // Gera um ID aleatório de 6 dígitos
    navigate(`/waiting-room/${gameId}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Selecionar um Kahoot</h1>

        {kahoots.length > 0 ? (
          <ul className="space-y-4">
            {kahoots.map((kahoot) => (
              <li key={kahoot.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <span className="text-lg font-semibold text-gray-700">{kahoot.title}</span>
                <button
                  onClick={() => handleSelectKahoot(kahoot.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Jogar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-700">Você ainda não criou nenhum Kahoot.</p>
        )}
      </div>
    </div>
  );
};

export default SelectKahoot;
