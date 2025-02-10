import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao GabQuiz</h1>
      
      <div className="space-y-6">
        <button 
          onClick={() => navigate(user ? '/create-kahoot' : '/login')} 
          className="bg-white text-blue-500 px-8 py-4 rounded-lg font-semibold text-xl w-64 shadow-md hover:bg-gray-100"
        >
          Criar Quiz
        </button>
        <button 
          onClick={() => navigate(user ? '/select-kahoot' : '/login')} 
          className="bg-white text-blue-500 px-8 py-4 rounded-lg font-semibold text-xl w-64 shadow-md hover:bg-gray-100"
        >
          Jogar Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;