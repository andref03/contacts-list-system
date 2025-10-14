type ConfirmCardProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmCard({ message, onConfirm, onCancel }: ConfirmCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onCancel} />
      <div className="relative bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-sm p-6 z-10">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-500">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-3 py-2 bg-red-500 rounded hover:bg-red-600">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
