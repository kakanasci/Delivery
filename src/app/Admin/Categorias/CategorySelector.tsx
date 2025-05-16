'use client'
import React from 'react'

interface CategorySelectorProps {
  categorias: { id: string; nome: string }[]
  categoriaSelecionada: string | null
  onSelect: (id: string) => void
}

export default function CategorySelector({
  categorias,
  categoriaSelecionada,
  onSelect
}: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center mb-10">
      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-6 py-3 text-lg rounded-lg font-semibold transition-all duration-200 ease-in-out ${
            categoriaSelecionada === cat.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {cat.nome}
        </button>
      ))}
    </div>
  )
}
