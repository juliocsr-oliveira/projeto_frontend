import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/register/', { username, email, password });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setUser({ username, email }); // Define o usuário com os dados do registro
      navigate('/');
    } catch (error) {
      alert('Erro ao registrar! Verifique os dados inseridos.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#022894]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-[#022894] text-center mb-6">Criar Conta</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <button type="submit" className="bg-[#022894] text-white w-full py-2 rounded-lg">Registrar</button>
        </form>
        <p className="text-center mt-2 text-sm text-gray-600">
          Já tem uma conta? <span className="text-[#022894] cursor-pointer" onClick={() => navigate('/login')}>Faça login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
