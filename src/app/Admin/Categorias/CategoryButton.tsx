interface CategoryButtonProps {
  categoria: { id: string; nome: string }
  isSelected: boolean
  onClick: () => void
}

export default function CategoryButton({
  categoria,
  isSelected,
  onClick
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg rounded-lg font-semibold transition-all duration-200 ease-in-out ${
        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      {categoria.nome}
    </button>
  )
}
