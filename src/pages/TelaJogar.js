import { useLocation, useNavigate } from 'react-router-dom';

const QuizCriado = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- necessário para capturar o estado
  const quizId = location.state?.quizId; // <-- captura o quizId passado na navegação


  const handlePlay = () => {
    if (!quizId) {
      alert('ID do quiz não encontrado!');
      return;
    }
    navigate(`/play/${quizId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#022894] text-white">
      <div className="bg-white text-[#022894] p-8 rounded-lg shadow-lg w-[90%] max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz criado!</h1>
        <p className="text-lg mb-8">Deseja compartilhar?</p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/gerar-sala')}
            className="bg-[#022894] text-white px-6 py-3 rounded-lg hover:bg-[#011b68] transition"
          >
            Sim
          </button>

          <button
            onClick={() => navigate('/tela-usuario')}
            className="bg-gray-300 text-[#022894] px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Não
          </button>

          <button
            onClick={handlePlay}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Jogar!
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCriado;
