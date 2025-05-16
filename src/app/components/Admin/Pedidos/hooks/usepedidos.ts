import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";

export interface Pedido {
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
}

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "pedidos"), orderBy("criadoEm", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const pedidosArray: Pedido[] = [];
        snapshot.forEach((doc) => {
          pedidosArray.push({ id: doc.id, ...(doc.data() as any) });
        });
        setPedidos(pedidosArray);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao carregar pedidos: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { pedidos, loading };
};
