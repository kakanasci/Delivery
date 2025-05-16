'use client'

type Props = {
  categorias: any[]
  categoriaSelecionada: string
  setCategoriaSelecionada: (value: string) => void
}

export default function CategoriaList({ categorias, categoriaSelecionada, setCategoriaSelecionada }: Props) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-6">Categorias</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaSelecionada(categoria.id)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              categoriaSelecionada === categoria.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-100'
            }`}
          >
            {categoria.nome}
          </button>
        ))}
      </div>
    </div>
  )
}
