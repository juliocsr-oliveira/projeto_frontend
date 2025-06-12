import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const CriarGabQuiz = ({ user }) => {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{
    text: '',
    type: 'VF',
    difficulty: 'facil',
    points: 100,
    options: ['', '', '', ''],
    expanded: true
  }]);
  const [, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access');
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert('Você precisa estar autenticado para criar um quiz.');
      navigate('/login');
    }

    console.log('👤 User recebido em CriarGabQuiz:', user);
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const handleAddQuestion = () => {
    if (questions.length > 0 && questions[questions.length - 1].text === '') {
      alert('Preencha a pergunta antes de adicionar uma nova.');
      return;
    }
    setQuestions([...questions, {
      text: '',
      type: 'VF',
      difficulty: 'facil',
      points: 100,
      options: ['', '', '', ''],
      expanded: true
    }]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const toggleType = (index) => {
    const types = ['trueFalse', 'MC'];
    const current = questions[index].type;
    const next = types[(types.indexOf(current) + 1) % types.length];
    handleChange(index, 'type', next);
  };

  const toggleDifficulty = (index) => {
    const levels = ['facil', 'medio', 'dificil'];
    const current = questions[index].difficulty;
    const next = levels[(levels.indexOf(current) + 1) % levels.length];
    handleChange(index, 'difficulty', next);
  };

  const toggleExpand = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].expanded = !updatedQuestions[index].expanded;
    setQuestions(updatedQuestions);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    if (!token) {
      alert('Você precisa estar autenticado para criar um quiz.');
      navigate('/login');
      return;
    }

    const userId = user?.id;
    if (!userId) {
      alert("Usuário não carregado. Faça login novamente.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create/', {
        titulo: quizTitle,
        usuario: userId,
        perguntas: questions.map(q => ({
          texto: q.text,
          tipo: q.type,
          dificuldade: q.difficulty,
          pontuacao: q.points
        }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Quiz criado com sucesso:', response.data);
      navigate('/tela-jogar', { state: { quizId: response.data.id } });
    } catch (error) {
      console.error('Erro ao criar GabQuiz:', error);
      alert('Erro ao criar quiz. Verifique os dados.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#022894]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 relative">
        <button onClick={handleLogout} className="absolute top-4 right-4 bg-white text-[#022894] border border-[#022894] px-4 py-2 rounded-lg shadow-md hover:bg-[#022894] hover:text-white transition">Logout</button>
        <h1 className="text-3xl font-bold text-[#022894] text-center mb-6">Criar GabQuiz</h1>
        <p className="text-center text-gray-700 mb-4">Defina as perguntas e suas respectivas pontuações.</p>
        <form onSubmit={handleCreateQuiz} className="space-y-4">
          <input type="text" placeholder="Título do Quiz" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
          {questions.map((question, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-lg mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Pergunta {index + 1}</span>
                <button type="button" className="text-blue-600" onClick={() => toggleExpand(index)}>
                  {question.expanded ? 'Esconder' : 'Expandir'}
                </button>
              </div>
              {question.expanded && (
                <>
                  <input type="text" placeholder="Digite sua pergunta" value={question.text} onChange={(e) => handleChange(index, 'text', e.target.value)} className="w-full p-2 border rounded-lg mt-2" required />

                  <div className="flex gap-4 mt-2">
                    <button type="button" onClick={() => toggleType(index)} className="bg-[#022894] text-white px-4 py-2 rounded">{question.type === 'VF' ? 'Verdadeiro ou Falso' : question.type === 'multiple' ? 'Múltipla Escolha' : 'Escolha e Arraste'}</button>
                    <button type="button" onClick={() => toggleDifficulty(index)} className="bg-[#022894] text-white px-4 py-2 rounded">{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</button>
                  </div>

                  <input type="number" value={question.points} onChange={(e) => handleChange(index, 'points', parseInt(e.target.value))} className="w-full mt-2 p-2 border rounded-lg" placeholder="Pontuação da pergunta (ex: 100)" required />
                </>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion} className="bg-green-500 text-white w-full py-2 rounded-lg">Adicionar pergunta</button>
          <button type="submit" className="bg-[#022894] text-white w-full py-2 rounded-lg">Criar GabQuiz</button>
        </form>
      </div>
    </div>
  );
};

export default CriarGabQuiz;
