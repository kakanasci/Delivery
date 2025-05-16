// ModalEditarProduto.tsx
"use client"

import { useEffect, useRef, useState } from 'react'

type Opcional = {
  nome: string
  preco: number
}

type Produto = {
  id?: string
  nome: string
  descricao: string
  preco: number | string
  imagem: string
  opcionais?: Opcional[]
}

type Props = {
  editandoProduto: Produto | null
  setEditandoProduto: (value: Produto | null) => void
  salvarEdicao: (produtoAtualizado: Produto) => Promise<void>
}

export default function ModalEditarProduto({
  editandoProduto,
  setEditandoProduto,
  salvarEdicao
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [produtoLocal, setProdutoLocal] = useState<Produto>(
    editandoProduto || { nome: '', descricao: '', preco: 0, imagem: '', opcionais: [] }
  )

  useEffect(() => {
    if (editandoProduto) {
      setProdutoLocal({ ...editandoProduto, opcionais: editandoProduto.opcionais || [] })
    }
  }, [editandoProduto])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setEditandoProduto(null)
    }
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setEditandoProduto(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setEditandoProduto])

  if (!editandoProduto) return null

  const handleChange = (field: keyof Produto, value: any) => {
    setProdutoLocal(prev => ({ ...prev, [field]: value }))
  }

  const adicionarOpcional = () => {
    setProdutoLocal(prev => ({
      ...prev,
      opcionais: [...(prev.opcionais || []), { nome: '', preco: 0 }]
    }))
  }

  const atualizarOpcional = (index: number, field: keyof Opcional, value: any) => {
    setProdutoLocal(prev => {
      const novos = prev.opcionais?.map((op, i) =>
        i === index ? { ...op, [field]: field === 'preco' ? parseFloat(value) || 0 : value } : op
      )
      return { ...prev, opcionais: novos }
    })
  }

  const removerOpcional = (index: number) => {
    setProdutoLocal(prev => ({
      ...prev,
      opcionais: prev.opcionais?.filter((_, i) => i !== index)
    }))
  }

  const handleSalvar = async () => {
    await salvarEdicao(produtoLocal)
    setEditandoProduto(null)
  }

  return (
    <div className="fixed inset-0 bg-[#00000091] bg-opacity-50 flex justify-center items-center z-50" role="dialog" aria-modal="true" aria-labelledby="editarProdutoTitulo">
      <div ref={modalRef} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 id="editarProdutoTitulo" className="text-xl font-semibold text-gray-800">Editar Produto</h2>

        <input
          type="text"
          value={produtoLocal.nome}
          onChange={e => handleChange('nome', e.target.value)}
          placeholder="Nome"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={produtoLocal.descricao}
          onChange={e => handleChange('descricao', e.target.value)}
          placeholder="Descrição"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          step="0.01"
          value={produtoLocal.preco}
          onChange={e => handleChange('preco', parseFloat(e.target.value) || 0)}
          placeholder="Preço"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={produtoLocal.imagem}
          onChange={e => handleChange('imagem', e.target.value)}
          placeholder="URL da Imagem"
          className="w-full px-4 py-2 border rounded-md"
        />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold">Opcionais</h3>
            <button onClick={adicionarOpcional} className="text-green-600 text-lg">Adicionar +</button>
          </div>
          {produtoLocal.opcionais?.map((op, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={op.nome}
                onChange={e => atualizarOpcional(index, 'nome', e.target.value)}
                placeholder="Nome opcional"
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                step="0.01"
                value={op.preco}
                onChange={e => atualizarOpcional(index, 'preco', e.target.value)}
                placeholder="Preço"
                className="w-24 px-3 py-2 border rounded-md"
              />
              <button onClick={() => removerOpcional(index)} className="text-red-500">Excluir</button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={() => setEditandoProduto(null)} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancelar</button>
          <button onClick={handleSalvar} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Salvar</button>
        </div>
      </div>
    </div>
  )}