import React from "react";

interface PedidoCardProps {
  pedido: {
    id: string;
    cliente: string;
    endereco: string;
    total: number;
    status: "pendente" | "em_andamento" | "finalizado" | "cancelado";
    pagamento: "pix" | "cartao" | "dinheiro";
    itens: Array<{
      nome: string;
      quantidade: number;
      preco: number;
      opcionais?: string[];
    }>;
    criadoEm: { seconds: number; nanoseconds: number };
  };
  onAtualizarStatus: (id: string, status: string) => void;
}

const statusLabels: Record<string, string> = {
  pendente: "Pendente",
  em_andamento: "Em Andamento",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

const statusColors: Record<string, string> = {
  pendente: "bg-yellow-300 text-yellow-900",
  em_andamento: "bg-blue-300 text-blue-900",
  finalizado: "bg-green-300 text-green-900",
  cancelado: "bg-red-300 text-red-900",
};

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, onAtualizarStatus }) => {
  const data = new Date(pedido.criadoEm.seconds * 1000).toLocaleString();

  return (
    <div className="border rounded-md p-4 shadow-md bg-white mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Pedido #{pedido.id}</h3>
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${statusColors[pedido.status]}`}
        >
          {statusLabels[pedido.status]}
        </span>
      </div>

      <p>
        <strong>Cliente:</strong> {pedido.cliente}
      </p>
      <p>
        <strong>Endereço:</strong> {pedido.endereco}
      </p>
      <p>
        <strong>Pagamento:</strong>{" "}
        {pedido.pagamento.charAt(0).toUpperCase() + pedido.pagamento.slice(1)}
      </p>
      <p>
        <strong>Data:</strong> {data}
      </p>

      <div className="mt-3">
        <strong>Itens:</strong>
        <ul className="list-disc list-inside">
          {pedido.itens.map((item, i) => (
            <li key={i}>
              {item.nome} x {item.quantidade} - R${item.preco.toFixed(2)}{" "}
              {item.opcionais && item.opcionais.length > 0 && (
                <em>(Opcionais: {item.opcionais.join(", ")})</em>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 font-bold text-right text-lg">Total: R${pedido.total.toFixed(2)}</p>

      <div className="flex gap-2 mt-4">
        {pedido.status !== "finalizado" && pedido.status !== "cancelado" && (
          <>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              onClick={() => onAtualizarStatus(pedido.id, "em_andamento")}
            >
              Em andamento
            </button>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              onClick={() => onAtualizarStatus(pedido.id, "finalizado")}
            >
              Finalizar
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              onClick={() => onAtualizarStatus(pedido.id, "cancelado")}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PedidoCard;
