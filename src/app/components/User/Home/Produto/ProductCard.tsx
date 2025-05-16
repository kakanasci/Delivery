interface ProdutoCardProps {
  nome: string
  descricao: string
  preco: number
  imagem: string
  onAdicionar: (produto: {
    nome: string
    descricao: string
    preco: number
    imagem: string
  }) => void
}


export default function ProdutoCard({
  nome,
  descricao,
  preco,
  imagem,
  onAdicionar,
}: ProdutoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      <img src={imagem} alt={nome} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{nome}</h2>
        <p className="text-sm text-gray-600 mt-2">{descricao}</p>
        <p className="text-xl font-bold text-green-600 mt-4">
          R$ {Number(preco).toFixed(2)}
        </p>
        <button
  onClick={() =>
    onAdicionar({
      nome,
      descricao,
      preco,
      imagem,
    })
  }
  className="w-full mt-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-500 transition"
>
  Adicionar
</button>

      </div>
    </div>
  )
}
