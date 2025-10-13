import React, { useEffect, useState } from "react";
import { getContacts } from "../services/contactService";

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
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState<string | null>(null);

  const isEmailFormatValid = /\S+@\S+\.\S+/.test(email);
  const isValid = name.trim() !== "" && isEmailFormatValid && !emailExists;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setPhone(initialData.phone || "");
    }
  }, [initialData]);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function checkEmail() {
      if (!email || !isEmailFormatValid) {
        setEmailExists(false);
        setEmailCheckError(null);
        return;
      }

      if (initialData?.email && initialData.email === email) {
        setEmailExists(false);
        setEmailCheckError(null);
        return;
      }

      setCheckingEmail(true);
      setEmailCheckError(null);
      try {
        const res = await getContacts({ q: email, page: 1, pageSize: 1 });
        const list = (res.data.data || res.data) as any[];
        const found = list && list.length ? list[0] : null;
        if (!mounted) return;
        if (found && found.email && found.email.toLowerCase() === email.toLowerCase()) {
          setEmailExists(true);
        } else {
          setEmailExists(false);
        }
      } catch (err: any) {
        if (!mounted) return;
        setEmailCheckError("Erro ao verificar email");
        setEmailExists(false);
      } finally {
        if (mounted) setCheckingEmail(false);
      }
    }

    timer = setTimeout(checkEmail, 500);

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [email, initialData]);

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

      {checkingEmail && <div className="text-sm text-yellow-300 mb-2">Verificando email...</div>}
      {emailCheckError && <div className="text-sm text-red-400 mb-2">{emailCheckError}</div>}
      {!checkingEmail && emailExists && <div className="text-sm text-red-500 mb-2">Este email já está em uso.</div>}

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
