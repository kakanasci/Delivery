'use client'

type Props = {
  categoriaNome: string
  setCategoriaNome: (value: string) => void
  adicionarCategoria: () => void
}

export default function CategoriaForm({ categoriaNome, setCategoriaNome, adicionarCategoria }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Adicionar Categoria</h2>
      <input
        type="text"
        value={categoriaNome}
        onChange={(e) => setCategoriaNome(e.target.value)}
        placeholder="Nome da categoria"
        className="border w-full px-4 py-2 rounded-md mb-3"
      />
      <button
        onClick={adicionarCategoria}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Adicionar Categoria
      </button>
    </div>
  )
}
