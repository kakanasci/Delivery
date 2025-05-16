'use client'

interface EditProductModalProps {
  novoProduto: any
  setNovoProduto: (value: any) => void
  onSave: () => void
  onCancel: () => void
}

export default function EditProductModal({
  novoProduto,
  setNovoProduto,
  onSave,
  onCancel
}: EditProductModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>
        <input
          type="text"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Nome do Produto"
        />
        <textarea
          value={novoProduto.descricao}
          onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Descrição do Produto"
        />
        <input
          type="text"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Preço"
        />
        <input
          type="text"
          value={novoProduto.imagem}
          onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="URL da Imagem"
        />
        <button onClick={onSave} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Salvar
        </button>
        <button onClick={onCancel} className="w-full mt-2 bg-gray-300 text-black p-2 rounded hover:bg-gray-400">
          Cancelar
        </button>
      </div>
    </div>
  )
}
