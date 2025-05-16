import CriarProduto from '@/app/components/Admin/CriarProduto'
import { listarCategorias } from '@/app/lib/firebase/categories'

export default async function ProdutosPage() {
  const categorias = await listarCategorias()

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Adicionar Produto</h2>
      <select className="border p-2 mb-6">
        {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </select>
      <CriarProduto categoriaId={categorias[0]?.id || ''} />
    </div>
  )
}
