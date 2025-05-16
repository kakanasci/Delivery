"use client"

import { useState, useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'
import { FiPlus, FiMinus } from 'react-icons/fi'
import Checkout from './Checkout'
import Pagamento from './Pagamento'

interface Opcional {
  id?: string
  nome: string
  preco: number | string
  quantidade?: number
}

interface Produto {
  id: string
  nome: string
  preco: number | string
  imagem?: string
  descricao?: string
  quantidade?: number
  opcionais?: Opcional[]
}

interface CartModalProps {
  mostrarCarrinho: boolean
  carrinho: Produto[]
  setMostrarCarrinho: (value: boolean) => void
  removerDoCarrinho: (produtoId: string) => void
  esvaziarCarrinho: () => void
  atualizarQuantidade: (produtoId: string, opcionalIndex: number, novaQuantidade: number) => void
}

const CartModal: React.FC<CartModalProps> = ({
  mostrarCarrinho,
  carrinho,
  setMostrarCarrinho,
  removerDoCarrinho,
  esvaziarCarrinho,
  atualizarQuantidade
}) => {
  const [step, setStep] = useState<"carrinho" | "checkout" | "pagamento">("carrinho")

  const steps = ['carrinho', 'checkout', 'pagamento'] as const

  useEffect(() => {
    document.body.style.overflow = mostrarCarrinho ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mostrarCarrinho])

  if (!mostrarCarrinho) return null

  const handleClose = () => setMostrarCarrinho(false)

  const handleBack = () => {
    if (step === "checkout") setStep("carrinho")
    else if (step === "pagamento") setStep("checkout")
  }

  // dentro de CartModal, substitua o handleNext por isso:
const handleNext = () => {
  if (step === "carrinho") {
    setStep("checkout")
  } else if (step === "checkout") {
    // Salva o total no localStorage antes de ir para pagamento
    localStorage.setItem("pedido", JSON.stringify({ total: totalCarrinho }))
    setStep("pagamento")
  }
}


  const handleFinalizarPagamento = () => {
    console.log('Pagamento confirmado')
    setMostrarCarrinho(false)
    esvaziarCarrinho()
  }

  const parsePreco = (preco: number | string | undefined): number => {
    if (preco === undefined || preco === null) return 0
    if (typeof preco === 'number') return preco
    if (typeof preco === 'string') {
      const cleaned = preco.replace(/[R$\s]/g, '').replace(',', '.')
      const parsed = parseFloat(cleaned)
      return isNaN(parsed) ? 0 : parsed
    }
    return 0
  }

  const formatarPreco = (valor: number) => `R$ ${valor.toFixed(2)}`

const calcularSubtotalItem = (item: Produto): number => {
  try {
    const precoBase = parsePreco(item?.preco)
    const totalOpcionais = item?.opcionais?.reduce((total, op) => {
      const precoOp = parsePreco(op?.preco)
      const quantidadeOp = op?.quantidade || 1
      console.log(`Opcional: ${op.nome}, Preço: ${precoOp}, Quantidade: ${quantidadeOp}`)
      return total + precoOp * quantidadeOp
    }, 0) || 0
    const subtotal = (precoBase + totalOpcionais) * (item.quantidade || 1)
    console.log(`Produto: ${item.nome}, Preço Base: ${precoBase}, Total Opcionais: ${totalOpcionais}, Quantidade Produto: ${item.quantidade}, Subtotal: ${subtotal}`)
    return subtotal
  } catch (error) {
    console.error('Erro ao calcular subtotal do item:', error)
    return 0
  }
}


  const calcularTotalCarrinho = (): number => {
    return carrinho.reduce((total, item) => {
      return total + calcularSubtotalItem(item)
    }, 0)
  }

  const handleAumentarQuantidade = (produtoId: string, opcionalIndex: number) => {
    const produto = carrinho.find(p => p.id === produtoId)
    if (!produto || !produto.opcionais) return
    const novaQuantidade = (produto.opcionais[opcionalIndex].quantidade || 1) + 1
    atualizarQuantidade(produtoId, opcionalIndex, novaQuantidade)
  }

  const handleDiminuirQuantidade = (produtoId: string, opcionalIndex: number) => {
    const produto = carrinho.find(p => p.id === produtoId)
    if (!produto || !produto.opcionais) return
    const novaQuantidade = Math.max(1, (produto.opcionais[opcionalIndex].quantidade || 1) - 1)
    atualizarQuantidade(produtoId, opcionalIndex, novaQuantidade)
  }

  const totalCarrinho = calcularTotalCarrinho()

  return (
    <div role="dialog" className="fixed inset-0 bg-[#0000008c] bg-opacity-80 z-50 flex justify-end">
      <div className="bg-white shadow-xl w-full max-w-md h-full flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-300">
          <div className="bg-red-600 flex border-r border-gray-300">
            <button
              aria-label="Voltar"
              onClick={handleBack}
              className="w-14 h-14 flex items-center justify-center text-white text-3xl rounded-full"
            >
              <IoIosArrowBack />
            </button>
          </div>

          <div className="flex space-x-4 text-gray-600 text-lg font-normal flex-1 justify-center">
            {steps.map((etapa, idx) => (
              <span
                key={etapa}
                className={`${step === etapa ? "pb-2 font-bold text-red-600" : ""} ${idx < steps.length - 1 ? "border-r border-gray-300 pr-4" : ""}`}
              >
                {etapa.charAt(0).toUpperCase() + etapa.slice(1)}
              </span>
            ))}
          </div>

          <div className="bg-red-600 flex border-l border-gray-300">
            <button
              aria-label="Fechar carrinho"
              className="w-14 h-14 flex items-center justify-center text-white text-3xl rounded-full"
              onClick={handleClose}
            >
              <IoMdClose />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="overflow-y-auto p-6 flex-1 text-gray-900">
          {step === "carrinho" && (
            <>
              {carrinho.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-gray-600 text-lg mb-4">Seu carrinho está vazio</p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Voltar ao cardápio
                  </button>
                </div>
              ) : (
                <>
                  <ul className="space-y-4">
                    {carrinho.map((item) => {
                      const precoBase = parsePreco(item.preco)
                      const subtotalItem = calcularSubtotalItem(item)

                      return (
                        <li key={item.id} className="border-b pb-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-3">
                              {item.imagem && (
                                <img 
                                  src={item.imagem} 
                                  alt={item.nome} 
                                  className="w-16 h-16 object-cover rounded"
                                />
                              )}
                              <div>
                                <h3 className="font-semibold text-black">{item.nome}</h3>
                                <p className="text-sm text-gray-600">{item.descricao}</p>
                              </div>
                            </div>
                            <span className="font-semibold text-black">{formatarPreco(precoBase)}</span>
                          </div>

                          {item.opcionais?.length > 0 && (
                            <ul className="ml-4 mt-2 space-y-2">
                              {item.opcionais.map((opcional, idx) => (
                                <li key={idx} className="flex justify-between items-center">
                                  <div className="text-sm text-gray-800">
                                    <span className="text-black">• {opcional.nome}</span>
                                    {opcional.quantidade && opcional.quantidade > 1 && (
                                      <span className="text-gray-500 ml-1">(x{opcional.quantidade})</span>
                                    )}
                                  </div>
                                
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="flex justify-between items-center mt-3">
                            <button
                              onClick={() => removerDoCarrinho(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm flex items-center"
                            >
                              <IoMdClose size={14} className="mr-1" />
                              Remover
                            </button>
                            <div className="text-right">
                              <span className="text-sm text-gray-500">Subtotal:</span>
                              <span className="ml-2 font-semibold text-black">
                                {formatarPreco(subtotalItem)}
                              </span>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total do pedido:</span>
                      <span className="font-bold text-lg text-green-600">
                        {formatarPreco(totalCarrinho)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {step === "checkout" && <Checkout total={totalCarrinho} />}
          {step === "pagamento" && <Pagamento total={totalCarrinho} />}
        </div>

        {/* Rodapé */}
        {step === "carrinho" && carrinho.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={esvaziarCarrinho}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Esvaziar Carrinho
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleNext}
              className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Ir para Pagamento
            </button>
          </div>
        )}

        {step === "pagamento" && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleFinalizarPagamento}
              className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Confirmar Pagamento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal
