import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HistoricoQuizzes() {
  const quizzes = [
    { id: 1, titulo: 'Quiz 1' },
    { id: 2, titulo: 'Quiz 2' },
    { id: 3, titulo: 'Quiz 3' },
    { id: 4, titulo: 'Quiz 4' },
    { id: 5, titulo: 'Quiz 5' },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Histórico de Quizzes</h1>

      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl px-4 py-3 hover:bg-gray-50 transition"
          >
            <span className="text-lg font-medium text-gray-800">{quiz.titulo}</span>
            <button
              onClick={() => navigate(`/dashboard/quiz/${quiz.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Ver dashboard
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4 mt-8">
        <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Editar perfil</button>
        <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Sala de espera</button>
      </div>
    </div>
  );
}
