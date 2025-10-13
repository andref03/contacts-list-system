import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; phone?: string }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto mt-6">
      <label className="font-medium text-white">Nome *</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Ex: João Silva"
        className="w-full mb-4 p-2 rounded"
      />

      <label className="font-medium text-white">Email *</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Ex: joao@email.com"
        className="w-full mb-4 p-2 rounded"
      />

      <label className="font-medium text-white">Telefone</label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="(99) 99999-9999"
        className="w-full mb-4 p-2 rounded"
      />

      <button
        type="submit"
        onClick={() => navigate("/list")}
        disabled={!isValid}
        className={`w-full p-2 rounded font-medium text-white transition ${isValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
          }`}
      >
        Salvar
      </button>
    </form>
  );
}
