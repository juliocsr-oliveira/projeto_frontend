import React, { useState } from 'react';

const allQuizzes = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'];
const allUsers = ['Usuário 1', 'Usuário 2', 'Usuário 3', 'Usuário 4', 'Usuário 5'];
const metrics = [
  'Eficiência do jogador',
  'Taxa de cada resposta certa',
  'Taxa de consistência',
  'Índice de acerto por categoria',
  'Média de acertos',
  'Tempo médio de Resposta',
  'Questão mais fácil',
  'Questão mais difícil',
  'Dificuldade progressiva',
  'Impacto do tempo limite',
  'Índice de engajamento',
  'Taxa de conclusão',
];

export default function Dashboard() {
  const [selectedQuiz, setSelectedQuiz] = useState(allQuizzes[0]);
  const [selectedUsers, setSelectedUsers] = useState([allUsers[0], allUsers[1]]);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user)
        ? prev.filter((u) => u !== user)
        : [...prev, user].slice(0, 5)
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      {/* Seletor de Quiz */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div>
          <label className="block text-sm font-medium mb-1">Selecionar Quiz:</label>
          <select
            value={selectedQuiz}
            onChange={(e) => setSelectedQuiz(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            {allQuizzes.map((quiz, i) => (
              <option key={i} value={quiz}>
                {quiz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Selecionar Usuários:</label>
          <div className="flex flex-wrap gap-2">
            {allUsers.map((user) => (
              <button
                key={user}
                onClick={() => toggleUserSelection(user)}
                className={`px-3 py-1 rounded-full border ${
                  selectedUsers.includes(user)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flag de comparação */}
      <div className="text-center text-sm text-gray-600 mt-2">
        {selectedUsers.length > 1 ? (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            Modo de comparação ativado: {selectedUsers.join(' vs ')}
          </span>
        ) : (
          <span className="text-gray-400">Selecione 2 ou mais usuários para comparar</span>
        )}
      </div>

      {/* Tabela comparativa */}
      <div className="overflow-auto border rounded-xl shadow">
        <table className="min-w-full text-sm border-separate border-spacing-y-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Métrica</th>
              {selectedUsers.map((user, idx) => (
                <th key={idx} className="p-3 text-center font-semibold">
                  {user}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, i) => (
              <tr key={i} className="bg-white hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{metric}</td>
                {selectedUsers.map((_, j) => (
                  <td key={j} className="p-3 text-center text-gray-700">
                    {generateMockValue(metric)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function generateMockValue(metric) {
  if (metric.includes('Tempo')) return `${(Math.random() * 10 + 5).toFixed(1)}s`;
  if (metric.includes('Taxa') || metric.includes('Eficiência') || metric.includes('Índice'))
    return `${Math.floor(Math.random() * 100)}%`;
  if (metric.includes('Questão')) return `#${Math.floor(Math.random() * 10) + 1}`;
  if (metric.includes('Média')) return `${(Math.random() * 10).toFixed(1)}`;
  return '-';
}
