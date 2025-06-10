import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#012794] text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-8">Bem-vindo ao GabQuiz</h1>
      <h1 className="text-2xl mb-8">Sua plataforma de quizzes online</h1>
      <div className="space-y-20">
        <button 
          onClick={() => navigate(user ? '/login' : '/login')} 
          className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-xl w-64 shadow-md hover:bg-gray-100"
        >
          Login</button>
          <button className="ml-10"></button>
  
        <button 
          onClick={() => navigate(user ? '/Register' : '/Register')} 
          className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-xl w-64 shadow-md hover:bg-gray-100"
        >
          Registre-se
        </button>
      </div>
    </div>
  );
};

export default Home;