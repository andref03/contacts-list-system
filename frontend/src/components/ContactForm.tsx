import React, { useEffect, useRef, useState } from "react";
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
  const [rawPhone, setRawPhone] = useState(initialData?.phone ? initialData.phone.replace(/\D/g, "") : "");
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState("");

  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  const isPhoneValid = phone.trim() === "" || phoneRegex.test(phone);
  const isValid = name.trim() !== "" && isEmailFormatValid && !emailExists && isPhoneValid;

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

  useEffect(() => {
    if (initialData?.phone) {
      const digits = initialData.phone.replace(/\D/g, "");
      setRawPhone(digits.slice(0, 11));
      setPhone(formatPhone(digits));
    }
  }, [initialData?.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    await onSubmit({ name, email, phone });
  };

  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, "");
    const digits = raw.slice(0, 11);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const countDigits = (s: string) => (s.match(/\d/g) || []).length;

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = phoneInputRef.current;
    if (!el) return;
    const selStart = el.selectionStart ?? 0;
    const selEnd = el.selectionEnd ?? 0;

    if (selStart !== selEnd) return;

    const formatted = phone;

    if (e.key === "Backspace") {
      const charLeft = formatted[selStart - 1];
      if (charLeft && /[^0-9]/.test(charLeft)) {
        e.preventDefault();
        const digitsBefore = countDigits(formatted.slice(0, selStart));
        if (digitsBefore > 0) {
          const idxToRemove = digitsBefore - 1;
          const newRaw = rawPhone.slice(0, idxToRemove) + rawPhone.slice(idxToRemove + 1);
          setRawPhone(newRaw);
          setPhone(formatPhone(newRaw));
        }
      }
    }

    if (e.key === "Delete") {
      const charRight = formatted[selStart];
      if (charRight && /[^0-9]/.test(charRight)) {
        e.preventDefault();
        const digitsBefore = countDigits(formatted.slice(0, selStart));
        const idxToRemove = digitsBefore;
        if (idxToRemove < rawPhone.length) {
          const newRaw = rawPhone.slice(0, idxToRemove) + rawPhone.slice(idxToRemove + 1);
          setRawPhone(newRaw);
          setPhone(formatPhone(newRaw));
        }
      }
    }
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

      <label className={`font-medium text-white ${emailExists ? "text-red-500" : ""}`}>Email *</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Ex: joao@email.com"
        className={`w-full mb-4 p-2 rounded ${emailExists ? "border-2 border-red-500" : "border border-gray-300"}`}
      />
      {checkingEmail && <div className="text-sm text-yellow-300 mb-2">Verificando email...</div>}
      {emailCheckError && <div className="text-sm text-red-400 mb-2">{emailCheckError}</div>}
      {!checkingEmail && emailExists && <div className="text-sm text-red-500 mb-2">Este email já está em uso.</div>}

      <label className="font-medium text-white">Telefone</label>
      <input
        ref={phoneInputRef}
        value={phone}
        onKeyDown={handlePhoneKeyDown}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
          setRawPhone(raw);
          setPhone(formatPhone(raw));

          if (raw.length > 0 && !(raw.length === 11)) {
            setPhoneError("Número incompleto");
          } else {
            setPhoneError("");
          }
        }}
        type="text"
        placeholder="(99) 99999-9999"
        className={`w-full mb-2 p-2 rounded ${phoneError ? "border-2 border-red-500" : "border border-gray-300"}`}
      />
      {phoneError && <div className="text-sm text-red-500 mb-2">{phoneError}</div>}

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full p-2 rounded font-medium text-white transition ${
          isValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        {submitLabel}
      </button>
    </form>
  );
}
