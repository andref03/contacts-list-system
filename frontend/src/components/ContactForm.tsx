import React, { useEffect, useState } from "react";

type ContactData = { name: string; email: string; phone?: string };
type ContactFormProps = {
  onSubmit: (data: ContactData) => Promise<void> | void;
  initialData?: ContactData;
  submitLabel?: string;
};

export default function ContactForm({ onSubmit, initialData, submitLabel = "Salvar" }: ContactFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const isValid = name.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setPhone(initialData.phone || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    await onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md mx-auto mt-6">
      <label
        className="font-medium text-white">
        Nome *
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text" placeholder="Ex: João Silva"
        className="w-full mb-4 p-2 rounded" />

      <label
        className="font-medium text-white">
        Email *
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Ex: joao@email.com"
        className="w-full mb-4 p-2 rounded" />

      <label
        className="font-medium text-white">
        Telefone
      </label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text" placeholder="(99) 99999-9999"
        className="w-full mb-4 p-2 rounded" />

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full p-2 rounded font-medium text-white transition ${isValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"}`}>
        {submitLabel}
      </button>
    </form>
  );
}
