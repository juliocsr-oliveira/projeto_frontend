import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // use "lucide-react" ou qualquer outro ícone

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Histórico de Quizzes', to: '/historico' },
    { label: 'Editar Perfil', to: '/editar-perfil' },
    { label: 'Sala de Espera', to: '/sala-espera' },
    { label: 'Configurar Dashboard', to: '/dashboard/configurar' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token'); // ou sessionStorage dependendo do seu caso
    navigate('/login');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-xl font-bold">GabQuiz</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-3">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-red-600 mt-4 hover:bg-red-100 px-3 py-2 rounded"
          >
            Sair
          </button>
        </nav>
      </div>
    </>
  );
}
