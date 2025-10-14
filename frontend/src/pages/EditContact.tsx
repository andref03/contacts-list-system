import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContactById, updateContact } from '../services/contactService';
import ContactForm from '../components/ContactForm';
import NotificationCard from '../components/NotificationCard';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    if (!id) return;
    async function fetchContact() {
      try {
        const res = await getContactById(Number(id));
        setInitialData(res.data);
      } catch (err) {
        console.error(err);
        alert('Contato não encontrado!');
        navigate('/list');
      }
    }
    fetchContact();
  }, [id, navigate]);

  if (!initialData) {
    return <p className="text-white text-center mt-10">Carregando contato...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center">
      <div className="mt-16 w-full md:max-w-2xl px-4 flex flex-col items-center">
        <button
          onClick={() => navigate('/list')}
          className="mb-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          Voltar
        </button>

        <h1 className="text-3xl text-white font-bold mb-3 text-center">Editar Contato</h1>

        <ContactForm
          initialData={initialData}
          onSubmit={async (data) => {
            try {
              await updateContact(Number(id), data);
              navigate('/list', { state: { notification: 'Contato atualizado com sucesso' } });
            } catch (err) {
              console.error(err);
              const nid = Date.now();
              setNotifications((prev) => [
                ...prev,
                { id: nid, message: 'Erro ao atualizar contato' },
              ]);
              setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== nid)), 5000);
            }
          }}
        />

        <div className="fixed bottom-4 right-4 w-80 z-50 flex flex-col-reverse gap-2">
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              message={n.message}
              onClose={() => setNotifications((prev) => prev.filter((x) => x.id !== n.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
