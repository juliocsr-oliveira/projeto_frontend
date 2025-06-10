import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Login (token JWT)
      const response = await axios.post('http://127.0.0.1:8000/api/account/login/', { username, password });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      // 2. Busca do usuário logado com token
      const userRes = await axios.get('http://127.0.0.1:8000/api/account/auth/user/', {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });

      const userData = userRes.data;
      console.log("✅ Usuário carregado:", userData);

      if (!userData.id) {
        alert('Erro: usuário logado sem ID. Verifique o back-end.');
        return;
      }

      setUser(userData);
      navigate('/tela_usuario'); // Corrigido para underscore se for assim no seu routes

    } catch (error) {
      alert('Erro ao fazer login! Verifique suas credenciais.');
      console.error('Erro no login:', error);
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
