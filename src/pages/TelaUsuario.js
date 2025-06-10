import { useNavigate } from 'react-router-dom';

const TelaUsuario = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#022894] text-white px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Bem-vindo, usuário!</h1>
      <div className="flex flex-col md:flex-row gap-6">
      <div className="space-y-20"> </div> 
        
        <button 
          onClick={() => navigate('/create-kahoot')}
          className="bg-white text-black font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition duration-200"
        >
          Criar quiz
        </button>
        
        <button
          onClick={() => navigate('/inserir-codigo-sala')}
          className="bg-white text-black font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition duration-200"
        >
          Ingressar em quiz já criado
        </button>
      </div>
    </div>
  );
};

export default TelaUsuario;
