import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CriarGabQuiz = ({ user }) => {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', type: '', points: 100, options: ['', '', '', ''], expanded: true }]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access');
    if (storedToken) {
      setToken(storedToken);
    } else {
      alert('Você precisa estar autenticado para criar um quiz.');
      navigate('/login');
    }
  }, [navigate]);

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
    setQuestions([...questions, { text: '', type: '', points: 100, options: ['', '', '', ''], expanded: false }]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
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

    if (!user?.id) {
      alert('Erro: ID do usuário não encontrado. Faça login novamente.');
      navigate('/login');
      return;
    }

    console.log("Token enviado:", token);
    console.log("Dados enviados:", {
      titulo: quizTitle,
      usuario: user.id,
      perguntas: questions.map(q => ({
        texto: q.text,
        tipo: q.type,
        pontuacao: q.points
      }))
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/quizzes/', {
        titulo: quizTitle,
        usuario: user.id,
        perguntas: questions.map(q => ({
          texto: q.text,
          tipo: q.type,
          pontuacao: q.points
        }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Quiz criado com sucesso:', response.data);
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Erro ao criar GabQuiz - Resposta do Servidor:', error.response.data);
        alert(`Erro: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('Erro ao criar GabQuiz - Sem resposta do servidor:', error.request);
        alert('Erro: Sem resposta do servidor. Verifique sua conexão.');
      } else {
        console.error('Erro ao criar GabQuiz - Configuração da requisição:', error.message);
        alert(`Erro desconhecido: ${error.message}`);
      }
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
                  <select value={question.type} onChange={(e) => handleChange(index, 'type', e.target.value)} className="w-full mt-2 p-2 border rounded-lg">
                    <option value="">Selecione</option>
                    <option value="trueFalse">Verdadeiro ou Falso</option>
                    <option value="multiple">Múltipla Escolha</option>
                  </select>
                  <input type="number" value={question.points} onChange={(e) => handleChange(index, 'points', parseInt(e.target.value))} className="w-full mt-2 p-2 border rounded-lg" placeholder="Pontuação da pergunta (ex: 100)" required />
                  <p className="text-sm text-gray-600 mt-1">A pontuação define o valor dessa pergunta no jogo.</p>
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
