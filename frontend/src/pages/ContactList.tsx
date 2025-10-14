import { useEffect, useState, useCallback } from 'react';
import { getContacts, deleteContact } from '../services/contactService';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationCard from '../components/NotificationCard';
import ConfirmCard from '../components/ConfirmCard';

type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const load = useCallback(
    async (q = query, p = page) => {
      setLoading(true);
      setError(null);
      try {
        const res = await getContacts({ q, page: p, pageSize });
        setContacts(res.data.data || res.data || []);
        setTotal(res.data.total ?? 0);
      } catch (err: any) {
        setError(err?.message || 'Erro ao carregar contatos');
        setContacts([]);
      } finally {
        setLoading(false);
      }
    },
    [query, page],
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (location.state?.notification) {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message: location.state.notification }]);
      setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 5000);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  async function handleDelete(id: number) {
    setPendingDeleteId(id);
  }

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const confirmDelete = async () => {
    if (pendingDeleteId == null) return;
    try {
      setLoading(true);
      await deleteContact(pendingDeleteId);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: 'Contato excluído com sucesso' },
      ]);
      await load();
    } catch (err: any) {
      setNotifications((prev) => [...prev, { id: Date.now(), message: 'Erro ao excluir contato' }]);
    } finally {
      setLoading(false);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => setPendingDeleteId(null);

  const totalPages = Math.max(1, Math.ceil((total || contacts.length) / pageSize));

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center px-4 py-10">
      <button
        onClick={() => navigate('/home')}
        className="mb-4 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        Voltar
      </button>
      <h1 className="text-3xl text-white font-bold mb-6">Lista de Contatos</h1>

      <div className="w-full md:max-w-2xl mb-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar por nome ou email..."
          className="flex-1 p-2 rounded"
        />
      </div>

      {loading ? <div className="text-white">Carregando...</div> : null}
      {error ? <div className="text-red-400">{error}</div> : null}

      <ul className="w-full md:max-w-2xl space-y-2">
        {contacts.map((c) => (
          <li
            key={c.id}
            className="bg-gray-800 p-3 rounded text-white flex justify-between items-center"
          >
            <div>
              <strong>{c.name}</strong> — {c.email} ({c.phone || 'sem telefone'})
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/edit/${c.id}`)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-bold bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((p) => {
              const v = p - 1;
              load(query, v);
              return v;
            });
          }}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => {
              setPage(p);
              load(query, p);
            }}
            className={`px-3 py-1 rounded ${p === page ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-white'}`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage((p) => {
              const v = p + 1;
              load(query, v);
              return v;
            });
          }}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      <div className="fixed bottom-4 right-4 w-80 z-50 flex flex-col-reverse gap-2">
        {notifications.map((n) => (
          <NotificationCard
            key={n.id}
            message={n.message}
            onClose={() => setNotifications((prev) => prev.filter((x) => x.id !== n.id))}
          />
        ))}
      </div>

      {pendingDeleteId != null && (
        <ConfirmCard
          message="Deseja realmente excluir este contato?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <button
        onClick={() => navigate('/add')}
        className="p-3 my-6  bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Cadastrar novo contato
      </button>
    </div>
  );
}
