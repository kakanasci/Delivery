import { useState } from 'react'

export default function PedidoPage() {
  const [tipoPedido, setTipoPedido] = useState('')
  const [nomeCliente, setNomeCliente] = useState('')
  const [telefoneCliente, setTelefoneCliente] = useState('')
  const [rua, setRua] = useState('')
  const [numeroEndereco, setNumeroEndereco] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cupom, setCupom] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode fazer o envio do formulário
    alert('Pedido enviado!')
  }

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <form onSubmit={handleSubmit}>
        {/* Tipo do Pedido */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Tipo do Pedido</h2>
          <div className="flex space-x-2 mt-2">
            <button
              type="button"
              onClick={() => setTipoPedido('Entrega')}
              className={`w-full py-2 text-center border border-gray-300 rounded-md ${tipoPedido === 'Entrega' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              Entrega
            </button>
            <button
              type="button"
              onClick={() => setTipoPedido('Retirar na loja')}
              className={`w-full py-2 text-center border border-gray-300 rounded-md ${tipoPedido === 'Retirar na loja' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              Retirar na loja
            </button>
            <button
              type="button"
              onClick={() => setTipoPedido('Pedido na loja')}
              className={`w-full py-2 text-center border border-gray-300 rounded-md ${tipoPedido === 'Pedido na loja' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              Pedido na loja
            </button>
          </div>
        </div>

        {/* Dados do Cliente */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Dados do Cliente</h2>
          <div className="mt-2">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Nome do cliente"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Telefone</label>
            <input
              type="tel"
              value={telefoneCliente}
              onChange={(e) => setTelefoneCliente(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>
        </div>

        {/* Informação de Entrega */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Informações de Entrega</h2>
          <div className="mt-2">
            <label className="block text-gray-700">Nome da Rua</label>
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Nome da rua"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Número do Endereço</label>
            <input
              type="number"
              value={numeroEndereco}
              onChange={(e) => setNumeroEndereco(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Número do endereço"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Apartamento, Suíte, etc.</label>
            <input
              type="text"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Ex: Bloco A, Suíte 202"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Bairro</label>
            <select
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="">Selecione</option>
              <option value="Centro">Centro</option>
              <option value="Zona Norte">Zona Norte</option>
              <option value="Zona Sul">Zona Sul</option>
              <option value="Zona Leste">Zona Leste</option>
              <option value="Zona Oeste">Zona Oeste</option>
            </select>
          </div>
        </div>

        {/* Cupom */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Cupom de Desconto</h2>
          <div className="mt-2">
            <label className="block text-gray-700">Se você tiver um cupom de desconto, adicione-o aqui.</label>
            <input
              type="text"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Ex: CUPOM10"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
