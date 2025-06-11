import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance'; // uso correto

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleError = (error) => {
    if (error.response) {
      console.error('Erro na resposta do servidor:', error.response.data);
      alert(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('Erro na requisição, sem resposta:', error.request);
      alert('Erro: nenhuma resposta do servidor. Verifique sua conexão.');
    } else {
      console.error('Erro ao configurar requisição:', error.message);
      alert(`Erro inesperado: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/login/', { username, password });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      const userResponse = await axiosInstance.get('/api/auth/user/', {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });

      setUser(userResponse.data);
      navigate('/tela-usuario');
    } catch (error) {
      handleError(error); // usar a função de tratamento que você já criou
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#022894]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-[#022894] text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <button type="submit" className="bg-[#022894] text-white w-full py-2 rounded-lg">Entrar</button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Esqueceu a senha? <span className="text-[#022894] cursor-pointer" onClick={() => navigate('/forgot-password')}>Redefina sua senha</span>
        </p>
        <p className="text-center mt-2 text-sm text-gray-600">
          Não tem uma conta? <span className="text-[#022894] cursor-pointer" onClick={() => navigate('/register')}>Crie sua conta</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
