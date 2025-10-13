import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; phone?: string }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState<
    { id: number; message: string }[]
  >([]);
  const [nextId, setNextId] = useState(0); // ID único para cada notificação

  const isValid = name.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({ name, email, phone });

    const id = nextId;
    setNextId(id + 1);

    const newNotification = {
      id,
      message: `Contato ${name}, ${email}${phone ? ", " + phone : ""} cadastrado com sucesso`,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);

    setName("");
    setEmail("");
    setPhone("");

    navigate("/list", { state: { notification: `Contato ${name}, ${email}${phone ? ", " + phone : ""} cadastrado com sucesso` } });
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md mx-auto mt-6"
      >
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
          disabled={!isValid}
          className={`w-full p-2 rounded font-medium text-white transition ${isValid
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 cursor-not-allowed"
            }`}
        >
          Salvar
        </button>
      </form>

      <div className="fixed bottom-4 right-4 w-80 z-50 flex flex-col-reverse gap-2">
        {notifications.map((n) => (
          <NotificationCard
            key={n.id}
            message={n.message}
            onClose={() => removeNotification(n.id)}
          />
        ))}
      </div>
    </div>
  );
}
