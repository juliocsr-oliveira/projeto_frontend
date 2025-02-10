import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordConfirm = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPasswordConfirm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }
    try {
      await axios.post(`http://127.0.0.1:8000/api/account/password-reset-confirm/${uidb64}/${token}/`, { password });
      setMessage('Senha redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage('Erro ao redefinir senha. Verifique o link e tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Nova Senha</h1>
        <form onSubmit={handleResetPasswordConfirm} className="space-y-4">
          <input type="password" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="password" placeholder="Confirme a nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg">Redefinir Senha</button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;