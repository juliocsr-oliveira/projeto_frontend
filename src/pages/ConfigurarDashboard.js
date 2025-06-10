import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const availableMetrics = [
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

export default function ConfigurarDashboard() {
  const navigate = useNavigate();
  const [selectedMetrics, setSelectedMetrics] = useState(availableMetrics);

  const toggleMetric = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const handleSalvar = () => {
    // Aqui você salvaria no contexto, localStorage ou backend
    localStorage.setItem('dashboardMetrics', JSON.stringify(selectedMetrics));
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Configurar Métricas do Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableMetrics.map((metric, idx) => (
          <label
            key={idx}
            className="flex items-center space-x-2 bg-white shadow p-3 rounded-md cursor-pointer hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric)}
              onChange={() => toggleMetric(metric)}
              className="accent-blue-600"
            />
            <span className="text-gray-800">{metric}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSalvar}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar e voltar
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
