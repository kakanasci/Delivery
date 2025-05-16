'use client'

import { useState } from 'react'

type Opcional = {
  nome: string
  preco: string
}

type Props = {
  categorias: any[]
  categoriaSelecionada: string
  setCategoriaSelecionada: (value: string) => void
  produtoNome: string
  setProdutoNome: (value: string) => void
  produtoDescricao: string
  setProdutoDescricao: (value: string) => void
  produtoPreco: string
  setProdutoPreco: (value: string) => void
  produtoImagem: string
  setProdutoImagem: (value: string) => void
  adicionarProduto: (opcionais: Opcional[]) => void
}

export default function ProdutoForm({
  categorias,
  categoriaSelecionada,
  setCategoriaSelecionada,
  produtoNome,
  setProdutoNome,
  produtoDescricao,
  setProdutoDescricao,
  produtoPreco,
  setProdutoPreco,
  produtoImagem,
  setProdutoImagem,
  adicionarProduto,
}: Props) {
  const [opcionais, setOpcionais] = useState<Opcional[]>([])
  const [novoOpcional, setNovoOpcional] = useState<Opcional>({ nome: '', preco: '' })
  const [meioAMeio, setMeioAMeio] = useState(false)

  const adicionarOpcional = () => {
    if (novoOpcional.nome && novoOpcional.preco) {
      setOpcionais([...opcionais, novoOpcional])
      setNovoOpcional({ nome: '', preco: '' })
    }
  }

  // Verifica se a categoria selecionada é de pizza
  const isPizza = () => {
    if (!categoriaSelecionada) return false
    const categoria = categorias.find(cat => cat.id === categoriaSelecionada)
    return categoria?.nome.toLowerCase().includes('pizza')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Adicionar Produto</h2>
      <select
        value={categoriaSelecionada}
        onChange={(e) => {
          setCategoriaSelecionada(e.target.value)
          // Resetar a opção meio a meio quando mudar a categoria
          setMeioAMeio(false)
        }}
        className="border w-full px-4 py-2 rounded-md mb-3"
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </select>
      <input type="text" value={produtoNome} onChange={(e) => setProdutoNome(e.target.value)} placeholder="Nome do produto" className="border w-full px-4 py-2 rounded-md mb-3" />
      <input type="text" value={produtoDescricao} onChange={(e) => setProdutoDescricao(e.target.value)} placeholder="Descrição" className="border w-full px-4 py-2 rounded-md mb-3" />
      <input type="text" value={produtoPreco} onChange={(e) => setProdutoPreco(e.target.value)} placeholder="Preço" className="border w-full px-4 py-2 rounded-md mb-3" />
      <input type="text" value={produtoImagem} onChange={(e) => setProdutoImagem(e.target.value)} placeholder="URL da imagem" className="border w-full px-4 py-2 rounded-md mb-3" />

      {/* Seção meio a meio (apenas para pizzas) */}
      {isPizza() && (
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={meioAMeio}
              onChange={(e) => setMeioAMeio(e.target.checked)}
              className="rounded text-blue-500"
            />
            <span>Permitir opção "meio a meio"?</span>
          </label>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Opcionais</h3>
        {opcionais.map((opcional, index) => (
          <div key={index} className="flex justify-between mb-1 text-sm text-gray-700">
            <span>{opcional.nome} - R$ {opcional.preco}</span>
          </div>
        ))}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={novoOpcional.nome}
            onChange={(e) => setNovoOpcional({ ...novoOpcional, nome: e.target.value })}
            placeholder="Nome do opcional"
            className="border px-2 py-1 rounded w-1/2"
          />
          <input
            type="text"
            value={novoOpcional.preco}
            onChange={(e) => setNovoOpcional({ ...novoOpcional, preco: e.target.value })}
            placeholder="Preço"
            className="border px-2 py-1 rounded w-1/3"
          />
          <button onClick={adicionarOpcional} className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600">+</button>
        </div>
      </div>

      <button
        onClick={() => {
          const todosOpcionais = [...opcionais]
          if (novoOpcional.nome && novoOpcional.preco) {
            todosOpcionais.push(novoOpcional)
          }
          // Adiciona o opcional meio a meio se for pizza e estiver marcado
          if (isPizza() && meioAMeio) {
            todosOpcionais.push({
              nome: "Meio a meio",
              preco: "0" // ou outro valor que você queira definir
            })
          }
          adicionarProduto(todosOpcionais)
        }}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Adicionar Produto
      </button>
    </div>
  )
}