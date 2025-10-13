import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";

export default function ContactList() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadContacts();

    if (location.state?.notification) {
      const id = nextId;
      setNextId(id + 1);

      setNotifications([{ id, message: location.state.notification }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  async function loadContacts() {
    const res = await getContacts();
    setContacts(res.data);
  }

  async function handleDelete(id: number) {
    if (confirm("Deseja realmente excluir este contato?")) {
      await deleteContact(id);
      loadContacts();
    }
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContacts = contacts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center px-4 py-10">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        Voltar
      </button>

      <h1 className="text-3xl text-white font-bold mb-6">Lista de Contatos</h1>

      <ul className="w-full md:max-w-2xl space-y-2">
        {currentContacts.map((c) => (
          <li
            key={c.id}
            className="bg-gray-800 p-3 rounded text-white flex justify-between items-center"
          >
            <div>
              <strong>{c.name}</strong> — {c.email} ({c.phone || "sem telefone"})
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
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1 rounded ${p === currentPage ? "bg-yellow-500 text-white" : "bg-gray-700 text-white"}`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      <div className="fixed bottom-4 right-4 w-80 z-50 flex flex-col-reverse gap-2">
        {notifications.map((n) => (
          <NotificationCard key={n.id} message={n.message} onClose={() => removeNotification(n.id)} />
        ))}
      </div>
    </div>
  );
}
