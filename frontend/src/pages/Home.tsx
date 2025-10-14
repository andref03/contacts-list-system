import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center pt-24 space-y-6">
      <h1 className="text-4xl text-white font-bold">Sistema de Contatos</h1>

      <button
        onClick={() => navigate('/add')}
        className="w-64 p-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Cadastrar novo contato
      </button>

      <button
        onClick={() => navigate('/list')}
        className="w-64 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Visualizar contatos
      </button>
    </div>
  );
}
