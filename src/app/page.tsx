"use client"

import { useEffect, useState } from 'react'
import { db } from './lib/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import Header from './components/User/Home/Header'
import CategoriaButton from './components/User/Home/Categoria'
import ProdutoCard from './components/User/Home/Produto/ProductCard'
import SearchBar from './components/User/Home/SearchBar'
import CartModal from './components/User/Home/Carrinho/Modal/CartModal'
import ProdutoModal from './components/User/Home/Produto/ModalProduct'

export default function HomePage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>('pizza')
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [todasPizzas, setTodasPizzas] = useState<Produto[]>([]) // Novo estado para todas as pizzas
  const [busca, setBusca] = useState('')
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
  const [carrinho, setCarrinho] = useState<Produto[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [mostrarProdutoModal, setMostrarProdutoModal] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  // Buscar todas as pizzas
  useEffect(() => {
    const buscarTodasPizzas = async () => {
      const categoriaPizza = categorias.find(cat => cat.nome.toLowerCase() === 'pizza')
      if (categoriaPizza) {
        const produtosRef = collection(db, 'categorias', categoriaPizza.id, 'produtos')
        const snapshot = await getDocs(produtosRef)
        const dados = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Produto),
        }))
        setTodasPizzas(dados)
      }
    }

    if (categorias.length > 0) {
      buscarTodasPizzas()
    }
  }, [categorias])

  const removerDoCarrinho = (produtoId: string) => {
    const novoCarrinho = carrinho.filter((produto) => produto.id !== produtoId)
    setCarrinho(novoCarrinho)
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
  }

  const esvaziarCarrinho = () => {
    setCarrinho([])
    localStorage.removeItem('carrinho')
  }

  const abrirModalProduto = (produto: Produto) => {
    setProdutoSelecionado(produto)
    setMostrarProdutoModal(true)
  }


 const adicionarAoCarrinho = (produtoDetalhado: Produto) => {
  setCarrinho(prev => [...prev, produtoDetalhado])
}



  useEffect(() => {
    setIsMounted(true)

    const buscarCategorias = async () => {
      const snapshot = await getDocs(collection(db, 'categorias'))
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome,
      }))
      setCategorias(dados)

      const categoriaPizza = dados.find((cat) => cat.nome.toLowerCase() === 'pizza')
      if (categoriaPizza) {
        setCategoriaSelecionada(categoriaPizza.id)
      }
    }

    buscarCategorias()
  }, [])

  useEffect(() => {
    const buscarProdutos = async () => {
      if (!categoriaSelecionada) {
        setProdutos([])
        return
      }
      const produtosRef = collection(db, 'categorias', categoriaSelecionada, 'produtos')
      const snapshot = await getDocs(produtosRef)
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Produto),
      }))
      setProdutos(dados)
    }

    if (categoriaSelecionada) {
      buscarProdutos()
    }
  }, [categoriaSelecionada])

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho')
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo))
    }
  }, [])

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const totalCarrinho = carrinho.reduce((acc, produto) => acc + Number(produto.preco), 0)
  const totalCarrinhoFormatted = isNaN(totalCarrinho) ? 0 : totalCarrinho

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <Header />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10 border-t border-b border-gray-300 pt-4 pb-4">
          <div className="flex w-full lg:w-2/3 overflow-x-auto space-x-4 py-2 scrollbar-none flex-grow-0">
            {categorias.map((cat) => (
              <CategoriaButton
                key={cat.id}
                id={cat.id}
                nome={cat.nome}
                isSelected={categoriaSelecionada === cat.id}
                onClick={() => {
                  setCategoriaSelecionada(cat.id)
                  setBusca('')
                }}
              />
            ))}
          </div>
          <SearchBar busca={busca} setBusca={setBusca} />
        </div>

        {categoriaSelecionada && produtosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              nome={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco}
              imagem={produto.imagem}
              onAdicionar={() => abrirModalProduto(produto)}
            />

          ))}
        </div>
      </section>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setMostrarCarrinho(true)}
          className="bg-red-400 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-500 transition"
        >
          Ver Carrinho ({carrinho.length})
        </button>
      </div>

      <CartModal
        mostrarCarrinho={mostrarCarrinho}
        carrinho={carrinho}
        setMostrarCarrinho={setMostrarCarrinho}
        removerDoCarrinho={removerDoCarrinho}
        esvaziarCarrinho={esvaziarCarrinho}
        totalCarrinhoFormatted={totalCarrinhoFormatted}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
      />
      {produtoSelecionado && (
        <ProdutoModal
          produto={produtoSelecionado}
          mostrar={mostrarProdutoModal}
          onFechar={() => setMostrarProdutoModal(false)}
          onAdicionar={(produtoDetalhado) => adicionarAoCarrinho(produtoDetalhado)}
          todasPizzas={todasPizzas}
        />

      )}


    </main>
  )
