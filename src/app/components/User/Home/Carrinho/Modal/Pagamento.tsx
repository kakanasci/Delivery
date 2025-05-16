import { useState, useEffect } from "react"

const Pagamento = () => {
  const [metodo, setMetodo] = useState("")
  const [gerandoPix, setGerandoPix] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [chavePix, setChavePix] = useState("")
  const [mensagemPix, setMensagemPix] = useState("")
  const [valor, setValor] = useState("0.00")

  // Pega o total do pedido ao montar o componente
  useEffect(() => {
    const pedido = JSON.parse(localStorage.getItem("pedido") || "{}")
    const total = parseFloat(pedido.total) || 0
    setValor(total.toFixed(2))
  }, [])

  // Gera o Pix automaticamente quando selecionado
  useEffect(() => {
    if (metodo === "pix") {
      const gerarPix = async () => {
        setGerandoPix(true)
        setQrCode("")
        setChavePix("")
        setMensagemPix("Gerando PIX, aguarde...")

        const valorFloat = parseFloat(valor)
        if (isNaN(valorFloat) || valorFloat <= 0) {
          setMensagemPix("Valor inválido.")
          setGerandoPix(false)
          return
        }

        try {
          const res = await fetch("http://localhost:4000/gerar-pix", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ valor: valorFloat }),
          })

          const data = await res.json()

          if (!res.ok) {
            const msg = data.error || "Erro ao gerar Pix"
            throw new Error(msg)
          }

          setQrCode(data.qrcode)
          setChavePix(data.copiaecola)
          setMensagemPix("Escaneie o QR Code ou copie a chave Pix.")
        } catch (err) {
          console.error("Erro ao gerar Pix:", err)
          if (err instanceof Error) {
            setMensagemPix(err.message)
          } else {
            setMensagemPix("Erro ao gerar Pix.")
          }
        } finally {
          setGerandoPix(false)
        }
      }

      gerarPix()
    }
  }, [metodo, valor])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pagamento</h2>
      <p className="text-gray-600 mb-4">Escolha sua forma de pagamento:</p>

      <div className="flex flex-col gap-3">
        {["pix", "cartao", "dinheiro"].map((opcao) => (
          <label key={opcao} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="pagamento"
              value={opcao}
              checked={metodo === opcao}
              onChange={(e) => {
                setMetodo(e.target.value)
                setQrCode("")
                setChavePix("")
                setMensagemPix("")
              }}
              className="accent-blue-500"
            />
            {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
          </label>
        ))}
      </div>

      {metodo && (
        <div className="mt-6 space-y-4">
          <p className="text-lg font-semibold">Total: R$ {valor}</p>

          {metodo === "pix" && (
            <>
              <p className="text-gray-700">{mensagemPix}</p>

              {gerandoPix && <p className="text-gray-500">Aguarde...</p>}

              {qrCode && (
                <img src={qrCode} alt="QR Code Pix" className="w-48 h-48" />
              )}

              {chavePix && (
                <div className="mt-2 bg-gray-100 p-2 rounded">
                  <p className="text-sm font-medium">Chave Pix:</p>
                  <p className="text-sm break-all">{chavePix}</p>
                </div>
              )}
            </>
          )}

          {metodo === "dinheiro" && (
            <p className="text-gray-700">Você pagará em dinheiro na entrega.</p>
          )}

          {metodo === "cartao" && (
            <p className="text-gray-700">Você pagará com cartão na entrega.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Pagamento
