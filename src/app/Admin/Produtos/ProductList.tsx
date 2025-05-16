'use client'

import ProdutoCard from './ProductCard'

interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string
}

interface Props {
  produtos: Produto[]
  onAdicionar: (produto: Produto) => void
}

export default function ProductList({ produtos, onAdicionar }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {produtos.map((produto) => (
        <ProdutoCard
          key={produto.id}
          {...produto}
          onAdicionar={() => onAdicionar(produto)}
        />
      ))}
    </div>
  )
}
