'use client'

import { useEffect, useState } from 'react'
import { Produto } from '@/types'
import { AiOutlineClose } from 'react-icons/ai'
import { FiPlus, FiMinus } from 'react-icons/fi'

type ProdutoModalProps = {
  produto: Produto
  mostrar: boolean
  onFechar: () => void
  onAdicionar: (produtoDetalhado: Produto) => void
  todasPizzas?: Produto[]
}

export default function ProdutoModal({
  produto,
  mostrar,
  onFechar,
  onAdicionar,
  todasPizzas = []
}: ProdutoModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [opcionaisSelecionados, setOpcionaisSelecionados] = useState<{ [key: number]: number }>({})
  const [meioAMeioAtivo, setMeioAMeioAtivo] = useState(false)
  const [sabor2, setSabor2] = useState<Produto | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (mostrar) {
      setOpcionaisSelecionados({})
      setMeioAMeioAtivo(false)
      setSabor2(null)
    }
  }, [mostrar, produto])

  if (!isMounted || !mostrar) return null

  const alterarQuantidade = (index: number, delta: number) => {
    setOpcionaisSelecionados(prev => {
      const atual = prev[index] || 0
      const novaQuantidade = Math.max(0, atual + delta)

      if (produto.opcionais?.[index]?.nome.toLowerCase().includes('meio a meio') && novaQuantidade === 0) {
        setSabor2(null)
      }

      if (novaQuantidade === 0) {
        const { [index]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [index]: novaQuantidade }
    })
  }

 const calcularTotal = (): number => {
  const precoBase = parseFloat(produto.preco.toString()) || 0
  const totalOpcionais = Object.entries(opcionaisSelecionados).reduce((total, [i, qtd]) => {
    const opcional = produto.opcionais?.[Number(i)]
    return total + (opcional ? parseFloat(opcional.preco.toString()) * qtd : 0)
  }, 0)

  if (meioAMeioAtivo && sabor2) {
    const precoSabor2 = parseFloat(sabor2.preco.toString()) || 0
    // Soma os dois preços e divide por 2 (média)
    const precoMeioAMeio = (precoBase + precoSabor2) / 2
    return precoMeioAMeio + totalOpcionais
  }

  return precoBase + totalOpcionais
}


  const total = calcularTotal()

  const handleAdicionarAoCarrinho = () => {
    const opcionaisDetalhados = Object.entries(opcionaisSelecionados).map(([i, qtd]) => {
      const opc = produto.opcionais?.[Number(i)]
      return opc ? { 
        ...opc, 
        quantidade: qtd,
        preco: parseFloat(opc.preco.toString()) || 0
      } : null
    }).filter(Boolean)

  let produtoDetalhado: Produto = {
  ...produto,
  preco: parseFloat(produto.preco.toString()), // só o preço base, sem opcionais
  opcionais: opcionaisDetalhados as any
}

 if (meioAMeioAtivo && sabor2) {
  const precoBase = parseFloat(produto.preco.toString()) || 0
  const precoSabor2 = parseFloat(sabor2.preco.toString()) || 0

  produtoDetalhado = {
    ...produtoDetalhado,
    nome: `Meio a Meio: ${produto.nome} / ${sabor2.nome}`,
    preco: (precoBase + precoSabor2) / 2 // apenas média, sem adicionais
  }
}


    onAdicionar(produtoDetalhado)
    onFechar()
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0000008f] flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md overflow-hidden relative">
        <div className="relative">
          <img src={produto.imagem} alt={produto.nome} className="w-full h-52 object-cover" />
          <button
            onClick={onFechar}
            className="absolute top-3 right-3 text-white bg-orange-300 rounded-full p-2"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">{produto.nome}</h2>
          <p className="text-sm text-gray-600 mt-2">{produto.descricao}</p>

          <ul className="my-4 space-y-2">
            {produto.opcionais?.map((op, idx) => {
              const qtd = opcionaisSelecionados[idx] || 0
              const isMeioAMeio = op.nome.toLowerCase().includes('meio a meio')

              return (
                <li key={idx} className="flex items-center justify-between">
                  <span>{op.nome} – R$ {Number(op.preco).toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    {isMeioAMeio ? (
                      <input
                        type="checkbox"
                        checked={meioAMeioAtivo}
                        onChange={(e) => {
                          const ativo = e.target.checked
                          setMeioAMeioAtivo(ativo)

                          if (!ativo) {
                            setSabor2(null)
                            setOpcionaisSelecionados((prev) => {
                              const { [idx]: _, ...rest } = prev
                              return rest
                            })
                          } else {
                            setOpcionaisSelecionados((prev) => ({ ...prev, [idx]: 1 }))
                          }
                        }}
                      />
                    ) : (
                      <>
                        <button onClick={() => alterarQuantidade(idx, -1)}><FiMinus /></button>
                        <span>{qtd}</span>
                        <button onClick={() => alterarQuantidade(idx, 1)}><FiPlus /></button>
                      </>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          {meioAMeioAtivo && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Escolha o outro sabor:</label>
                <select
                  value={sabor2?.id || ''}
                  onChange={(e) => {
                    const selected = todasPizzas.find(p => p.id === e.target.value)
                    setSabor2(selected || null)
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um sabor</option>
                  {todasPizzas
                    .filter(p => p.id !== produto.id)
                    .map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>
              </div>
            </div>
          )}

          <p className="text-lg font-bold text-green-600 mt-4">
            Total: R$ {total.toFixed(2)}
          </p>

          <button
            onClick={handleAdicionarAoCarrinho}
            disabled={meioAMeioAtivo && !sabor2}
            className="w-full mt-4 py-2 bg-orange-400 text-white rounded"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
