import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getCSRFToken = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue || '';
};

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const csrfToken = getCSRFToken(); // ✅ Pegando CSRF Token

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        { email, password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true, // ✅ Permite envio de cookies
        }
      );

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      
      // ✅ Buscando usuário autenticado
      const userResponse = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
        headers: { Authorization: `Bearer ${response.data.access}` },
        withCredentials: true,
      });
      
      setUser(userResponse.data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login! Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#022894]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-[#022894] text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Esqueceu a senha?{' '}
          <span className="text-[#022894] cursor-pointer" onClick={() => navigate('/forgot-password')}>
            Redefina sua senha
          </span>
        </p>
        <p className="text-center mt-2 text-sm text-gray-600">
          Não tem uma conta?{' '}
          <span className="text-[#022894] cursor-pointer" onClick={() => navigate('/register')}>
            Crie sua conta
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;