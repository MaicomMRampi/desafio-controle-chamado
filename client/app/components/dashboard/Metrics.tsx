import { AlertCircle, AlertTriangle, Clock, Flame } from "lucide-react";
import { MetricCard } from "../MetricCard";

interface Ticket {
  id: number;
  status: string;
  openingDate: string;
  priority: string;
}

interface MetricsProps {
  values: Ticket[];
}

export default function Metrics({ values = [] }: MetricsProps) {
  const now = new Date();
  const abertos = values.filter((item) => item.status === "Aberto").length;
  const vencidos = values.filter((item) => {
    const isAberto = item.status === "Aberto";
    const isVencido = new Date(item.openingDate) < now;
    return isAberto && isVencido
  }).length;

  const isResolved = values.filter((item) => item.status === "Resolvido").length;
  const critica = values.filter((item) => item.priority === "CRITICA").length;
  const alta = values.filter((item) => item.priority === "ALTA").length;

  return (
    <div className="gap-2 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 a">
      <MetricCard iconColor="bg-emerald-100 text-emerald-600" colorCard="bg-emerald-50 border-emerald-200" icon={AlertTriangle} title="Resolvidos" value={isResolved} />
      <MetricCard iconColor="bg-blue-100 text-blue-600" colorCard="bg-blue-50 border-blue-200" icon={Clock} title="Total em Aberto" value={abertos} />
      <MetricCard iconColor="bg-red-50 border-red-200" colorCard="bg-red-50 border-red-200" icon={AlertCircle} title="Vencidos" value={vencidos} />
      <MetricCard iconColor="bg-purple-100 text-purple-600" colorCard="bg-purple-50 border-purple-200" icon={Flame} title="Prioridade Crítica" value={critica} />
      <MetricCard iconColor="bg-amber-100 text-amber-600" colorCard="bg-amber-50 border-amber-200" icon={AlertTriangle} title="Prioridade Alta" value={alta} />
    </div>
  );
}