import React, { useState } from "react";
import PedidoCard from "./ui/card";
import { usePedidos } from "./hooks/usepedidos";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";

const statusOptions = [
  { value: "", label: "Todos" },
  { value: "pendente", label: "Pendente" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "finalizado", label: "Finalizado" },
  { value: "cancelado", label: "Cancelado" },
];

const AdminPedidos: React.FC = () => {
  const { pedidos, loading } = usePedidos();
  const [filtroStatus, setFiltroStatus] = useState<string>("");

  const pedidosFiltrados = filtroStatus
    ? pedidos.filter((p) => p.status === filtroStatus)
    : pedidos;

  const atualizarStatus = async (id: string, status: string) => {
    try {
      const pedidoRef = doc(db, "pedidos", id);
      await updateDoc(pedidoRef, { status });
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      alert("Erro ao atualizar status do pedido.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Painel de Pedidos</h1>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="filtro" className="font-semibold">
          Filtrar por status:
        </label>
        <select
          id="filtro"
          className="border border-gray-300 rounded px-3 py-1"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Carregando pedidos...</p>}

      {!loading && pedidosFiltrados.length === 0 && (
        <p className="text-gray-600">Nenhum pedido encontrado.</p>
      )}

      <div>
        {pedidosFiltrados.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onAtualizarStatus={atualizarStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPedidos;
