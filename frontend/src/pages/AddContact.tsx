import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { createContact } from "../services/contactService";

export default function AddContact() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center">

            <div className="mt-16 w-full md:max-w-2xl px-4 flex flex-col items-center">

                <button
                    onClick={() => navigate("/home")}
                    className="mb-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                    Voltar
                </button>

                <h1 className="text-3xl text-white font-bold mb-3 text-center">
                    Cadastrar Contato
                </h1>

                <ContactForm
                    onSubmit={async (data) => {
                        try {
                            await createContact(data);
                            navigate("/list");
                        } catch (err) {
                            console.error(err);
                        }
                    }}
                />
            </div>
        </div>
    );
}
