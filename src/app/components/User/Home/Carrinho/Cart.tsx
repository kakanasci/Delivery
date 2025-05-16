'use client'

interface Props {
  onClick: () => void
  quantidade: number
}

export default function CartButton({ onClick, quantidade }: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <button
        onClick={onClick}
        className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        Ver Carrinho ({quantidade})
      </button>
    </div>
  )
}
