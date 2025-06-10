import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlayKahoot = ({ user }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quizzes/${gameId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    })
      .then(response => setQuestions(response.data.questions))
      .catch(error => console.error('Erro ao buscar perguntas:', error));
  }, [gameId]);

  const handleAnswerSelect = (answer) => {
    if (answer === questions[currentQuestionIndex]?.correctAnswer) {
      setScore(score + questions[currentQuestionIndex]?.points);
    }
    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/ranking', { state: { finalScore: score } });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 text-center">
        {questions.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold text-blue-500 mb-4">{questions[currentQuestionIndex].text}</h1>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerSelect(option)} className="block w-full p-2 mb-2 bg-gray-200 rounded-lg">{option}</button>
            ))}
          </>
        ) : (
          <p className="text-gray-600">Carregando perguntas...</p>
        )}
      </div>
    </div>
  );
};

export default PlayKahoot;