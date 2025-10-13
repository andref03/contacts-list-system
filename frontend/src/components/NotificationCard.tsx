interface NotificationCardProps {
  message: string;
  onClose: () => void;
}

export default function NotificationCard({ message, onClose }: NotificationCardProps) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative mb-2">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-1 mr-2 text-green-800 font-bold"
      >
        X
      </button>
    </div>
  );
}
