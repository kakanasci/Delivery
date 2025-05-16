'use client'
import { PencilIcon } from '@heroicons/react/24/solid'

interface ProductCardProps {
  produto: any
  onEdit: () => void
}

export default function ProductCard({ produto, onEdit }: ProductCardProps) {
  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-56 object-cover object-center"
      />
      <div className="p-4 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800">{produto.nome}</h2>
        <p className="text-sm text-gray-600 mt-2">{produto.descricao}</p>
        <p className="text-xl font-bold text-green-600 mt-4">R$ {Number(produto.preco).toFixed(2)}</p>
      </div>
      <button
        onClick={onEdit}
        className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
        <PencilIcon className="w-6 h-6" />
      </button>
    </div>
  )
}
