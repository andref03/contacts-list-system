import { useEffect, useState } from "react";
import { getContacts, createContact } from "./services/contactService";

export default function App() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    validateForm();
  }, [name, email]);

  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = name.trim().length > 0 && emailRegex.test(email);
    setIsValid(valid);
  }

  async function loadContacts() {
    const res = await getContacts();
    setContacts(res.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    await createContact({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
    loadContacts();
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white mb-6">Cadastro de Contatos</h1>

        <form onSubmit={handleSubmit} className="flex flex-col mb-6">
          <p className="text-sm mb-2 text-red-500">* indica item obrigatório</p>

          <label className="font-medium text-white">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Insira nome..."
            className="w-full mb-5 p-2 rounded"
          />

          <label className="font-medium text-white">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Insira email..."
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
            disabled={!name || !email}
            className={`cursor-pointer w-full p-2 rounded font-medium transition text-center ${!name || !email
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
              }`}
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
