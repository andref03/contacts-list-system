import { useEffect, useState } from "react";
import { getContacts, createContact } from "./services/contactService";

export default function App() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    const res = await getContacts();
    setContacts(res.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createContact({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
    loadContacts();
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white mb-6">Clientes</h1>

        <form onSubmit={handleSubmit} className="flex flex-col mb-6">
          <label className="font-medium text-white">Nome *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Digite seu nome..."
            className="w-full mb-5 p-2 rounded"
          />

          <label className="font-medium text-white">Email *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Digite seu email..."
            className="w-full mb-5 p-2 rounded"
          />

          <label className="font-medium text-white">Telefone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="(99) 99999-9999"
            className="w-full mb-5 p-2 rounded"
          />

          <input
            type="submit"
            value="Salvar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium hover:bg-green-600 transition text-center"
          />
        </form>

        <ul className="space-y-2">
          {contacts.map((c) => (
            <li
              key={c.id}
              className="bg-gray-800 p-3 rounded text-white flex justify-between"
            >
              <span>
                <strong>{c.name}</strong> — {c.email} ({c.phone || "sem telefone"})
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
