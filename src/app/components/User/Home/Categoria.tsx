// components/CategoriaButton.tsx

interface CategoriaButtonProps {
  id: string;
  nome: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoriaButton({
  id,
  nome,
  isSelected,
  onClick,
}: CategoriaButtonProps) {
  return (
    <button
      key={id}
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium shadow transition-all ${
        isSelected
          ? 'bg-orange-300 text-white scale-105'
          : 'bg-white text-gray-800 hover:bg-gray-100'
      }`}
    >
      {nome}
    </button>
  )
}
