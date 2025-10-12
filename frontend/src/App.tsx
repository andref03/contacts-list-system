export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start px-4 py-10">
      <main className="w-full max-w-2xl">
        <h1 className="text-4xl font-semibold text-white mb-6">Cadastrar Contato</h1>

        <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Nome */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-medium mb-1">
              Nome *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome..."
              className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-red-500 text-sm mt-1">* indica item obrigatório</span>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-medium mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email..."
              className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-red-500 text-sm mt-1">* indica item obrigatório</span>
          </div>

          {/* Telefone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-white font-medium mb-1">
              Telefone
            </label>
            <input
              id="phone"
              type="text"
              placeholder="(99) 99999-9999"
              className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded transition-colors"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
