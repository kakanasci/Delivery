'use client'

import { FiEdit } from 'react-icons/fi'

type Props = {
  produtos: any[]
  excluirProduto: (produtoId: string) => void
  abrirModalEdicao: (produto: any) => void
  categoriaSelecionada: string
  categorias: any[]
}

export default function ProdutoList({
  produtos,
  excluirProduto,
  abrirModalEdicao,
  categoriaSelecionada,
  categorias,
}: Props) {
  const categoria = categorias.find((c) => c.id === categoriaSelecionada)

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-800 mb-4">
        Produtos de {categoria?.nome}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 relative">
            {produto.imagem && (
              <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded-md mb-4" />
            )}
            <h5 className="text-lg font-semibold text-gray-900">{produto.nome}</h5>
            <p className="text-gray-600 text-sm mb-2">{produto.descricao}</p>
            <p className="text-green-700 font-bold mb-3">R$ {produto.preco}</p>
            <div className="flex justify-between items-end">
              <button onClick={() => excluirProduto(produto.id)} className="text-red-600 hover:text-red-700 text-sm">
                Excluir
              </button>
              <button onClick={() => abrirModalEdicao(produto)} className="text-gray-500 hover:text-gray-700 text-lg">
                <FiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
