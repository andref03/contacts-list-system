import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
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

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center px-4 py-10">
      <button
        onClick={() => navigate("/")}
        className="mb-4 p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        Voltar
      </button>

      <h1 className="text-3xl text-white font-bold mb-6">Lista de Contatos</h1>

      <ul className="w-full md:max-w-2xl space-y-2">
        {contacts.map((c) => (
          <li
            key={c.id}
            className="bg-gray-800 p-3 rounded text-white flex justify-between items-center"
          >
            <div>
              <strong>{c.name}</strong> — {c.email} ({c.phone || "sem telefone"})
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/add?edit=${c.id}`)}
                className="text-bold bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
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
    </div>
  );
}
