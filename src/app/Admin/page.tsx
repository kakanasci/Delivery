"use client"

import { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase/config'
import CategoriaForm from '../components/Admin/CriarCategoria'
import ProdutoForm from '../components/Admin/CriarProduto'
import CategoriaList from '../components/Admin/CategoriaList'
import ProdutoList from '../components/Admin/ProductList'
import ModalEditarProduto from '../components/Admin/ModalEditar'
import AdminPedidos from '../components/Admin/Pedidos/GerenciarPedidos'

type Opcional = { nome: string; preco: number }
type Produto = { id?: string; nome: string; descricao: string; preco: number | string; imagem: string; opcionais?: Opcional[] }

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<{ id: string; nome: string }[]>([]);
  const [categoriaNome, setCategoriaNome] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const [produtoNome, setProdutoNome] = useState('');
  const [produtoDescricao, setProdutoDescricao] = useState('');
  const [produtoPreco, setProdutoPreco] = useState('');
  const [produtoImagem, setProdutoImagem] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editandoProduto, setEditandoProduto] = useState<Produto | null>(null);

  // Fetch categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      const snapshot = await getDocs(collection(db, 'categorias'));
      const categoriasData = snapshot.docs.map(doc => ({ id: doc.id, nome: doc.data().nome }));
      setCategorias(categoriasData);
    };
    fetchCategorias();
  }, []);

  // Fetch produtos da categoria selecionada
  useEffect(() => {
    const fetchProdutos = async () => {
      if (!categoriaSelecionada) return;
      const snapshot = await getDocs(
        collection(db, 'categorias', categoriaSelecionada, 'produtos')
      );
      const produtosData = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Produto) }));
      setProdutos(produtosData);
    };
    fetchProdutos();
  }, [categoriaSelecionada]);

  // Adicionar categoria
  const adicionarCategoria = async () => {
    if (!categoriaNome.trim()) return;
    const ref = await addDoc(collection(db, 'categorias'), { nome: categoriaNome });
    setCategorias(prev => [...prev, { id: ref.id, nome: categoriaNome }]);
    setCategoriaNome('');
  };

  // Adicionar produto com opcionais
  const adicionarProduto = async (opcionais: Opcional[]) => {
    if (!categoriaSelecionada || !produtoNome) return;
    const novoProduto: Produto = {
      nome: produtoNome,
      descricao: produtoDescricao,
      preco: parseFloat(produtoPreco) || 0,
      imagem: produtoImagem,
      opcionais,
    };
    const ref = await addDoc(
      collection(db, 'categorias', categoriaSelecionada, 'produtos'),
      novoProduto
    );
    setProdutos(prev => [...prev, { id: ref.id, ...novoProduto }]);

    setProdutoNome('');
    setProdutoDescricao('');
    setProdutoPreco('');
    setProdutoImagem('');
  };

  // Excluir produto
  const excluirProduto = async (id: string) => {
    await deleteDoc(doc(db, 'categorias', categoriaSelecionada, 'produtos', id));
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  // Salvar edição de produto (inclui opcionais)
  const salvarEdicao = async (produtoAtualizado: Produto) => {
    if (!produtoAtualizado.id) return;
    const ref = doc(
      db,
      'categorias',
      categoriaSelecionada,
      'produtos',
      produtoAtualizado.id
    );
    await updateDoc(ref, { ...produtoAtualizado });
    setProdutos(prev =>
      prev.map(p => (p.id === produtoAtualizado.id ? produtoAtualizado : p))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-10">
        <CategoriaForm
          categoriaNome={categoriaNome}
          setCategoriaNome={setCategoriaNome}
          adicionarCategoria={adicionarCategoria}
        />
        <ProdutoForm
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          produtoNome={produtoNome}
          setProdutoNome={setProdutoNome}
          produtoDescricao={produtoDescricao}
          setProdutoDescricao={setProdutoDescricao}
          produtoPreco={produtoPreco}
          setProdutoPreco={setProdutoPreco}
          produtoImagem={produtoImagem}
          setProdutoImagem={setProdutoImagem}
          adicionarProduto={adicionarProduto}
        />
      </div>

      <div>
        <CategoriaList
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
        <ProdutoList
          produtos={produtos}
          excluirProduto={excluirProduto}
          abrirModalEdicao={setEditandoProduto}
          categoriaSelecionada={categoriaSelecionada}
          categorias={categorias}
        />
      </div>

      <ModalEditarProduto
        editandoProduto={editandoProduto}
        setEditandoProduto={setEditandoProduto}
        salvarEdicao={salvarEdicao}
      />
      <AdminPedidos/>
    </div>
  );
}