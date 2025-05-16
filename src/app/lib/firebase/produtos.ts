// lib/firebase/produtos.ts
import { db } from './config'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export async function criarProduto(categoriaId: string, produto: {
  nome: string,
  preco: number,
  imagem?: string
}) {
  const ref = collection(db, `categorias/${categoriaId}/produtos`)
  const docRef = await addDoc(ref, produto)
  return docRef.id
}

export async function listarProdutos(categoriaId: string) {
  const snapshot = await getDocs(collection(db, `categorias/${categoriaId}/produtos`))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
