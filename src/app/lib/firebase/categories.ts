// lib/firebase/categories.ts
import { db } from './config'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export async function criarCategoria(nome: string) {
  const docRef = await addDoc(collection(db, 'categorias'), {
    nome,
  })
  return docRef.id
}

export async function listarCategorias() {
  const snapshot = await getDocs(collection(db, 'categorias'))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
