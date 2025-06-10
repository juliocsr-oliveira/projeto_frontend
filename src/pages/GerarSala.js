import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // ✅ import correto

const GerarSala = () => {
  const [roomCode, setRoomCode] = useState('');
  const [mostrarQRCode, setMostrarQRCode] = useState(false);

  const gerarCodigo = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    localStorage.setItem('roomCode', code);
    setMostrarQRCode(false); // Reseta o QR se for um novo código
  };

  const gerarQRCode = () => {
    if (!roomCode) {
      alert('Gere um ID primeiro!');
      return;
    }
    setMostrarQRCode(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#022894] text-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Compartilhe o ID da sua sala</h1>

      <div className="flex flex-col items-center gap-6">
        {/* Botão para gerar o ID */}
        <button
          onClick={gerarCodigo}
          className="bg-white text-[#022894] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
        >
          Gerar ID
        </button>

        {/* Exibe o ID da sala se existir */}
        {roomCode && (
          <>
            <div className="text-xl font-bold bg-white text-[#022894] px-4 py-2 rounded">
              {roomCode}
            </div>

            {/* Botão para gerar o QR Code */}
            <button
              onClick={gerarQRCode}
              className="bg-white text-[#022894] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
            >
              Gerar QR Code
            </button>
          </>
        )}

        {/* Aqui é onde o QR Code aparece */}
        {mostrarQRCode && roomCode && (
          <div className="bg-white p-4 rounded">
            <QRCodeSVG value={roomCode} size={128} /> {/* ✅ Aqui! */}
          </div>
        )}
      </div>
    </div>
  );
};

export default GerarSala;
