import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/account/password-reset/', { email });
      setMessage('Se o e-mail estiver cadastrado, enviaremos um link de redefinição.');
    } catch (error) {
      setMessage('Erro ao solicitar redefinição de senha.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Redefinir Senha</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg">Enviar Link</button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        <button onClick={() => navigate('/login')} className="mt-4 text-blue-500 hover:underline w-full text-center">Voltar para o Login</button>
      </div>
    </div>
  );
};

export default ForgotPassword;