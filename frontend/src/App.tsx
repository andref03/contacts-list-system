export default function App() {
  return (
    <div>
      <h1 className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">Clientes</h1>

          <form className="flex flex-col my-6">
            <label className="font-medium text-white">Nome *</label>
            <input 
              type="text" 
              placeholder="Digite seu nome..." 
              className="w-full mb-5 p-2 rounded"></input>

              <label className="font-medium text-white">Email *</label>
            <input 
              type="text" 
              placeholder="Digite seu email..." 
              className="w-full mb-5 p-2 rounded"></input>

              <label className="font-medium text-white">Telefone</label>
            <input 
              type="text" 
              placeholder="(99) 99999-9999" 
              className="w-full mb-5 p-2 rounded"></input>

              <input 
                type="submit" 
                value="Enviar"
                className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
          </form>


        </main>
      </h1>
    </div>
  )
}