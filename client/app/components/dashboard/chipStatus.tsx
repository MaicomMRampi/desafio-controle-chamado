import { Chip } from "@heroui/react";

export function Status({ value }: { value: string }) {
  const colors: Record<string, string> = {
    Aberto: "bg-blue-100 text-blue-700",
    "Em Atendimento": "bg-yellow-100 text-yellow-700",
    Resolvido: "bg-green-100 text-green-700",
    Cancelado: "bg-red-100 text-red-700",
  };

  return (
    <Chip className={colors[value] || "bg-gray-100 text-gray-700"} size="sm">
      {value}
    </Chip>
  );
}

export function Priority({ value }: { value: string }) {
  const colors: Record<string, string> = {
    BAIXA: "bg-green-500 text-white",
    MEDIA: "bg-blue-100 text-blue-700",
    MÉDIA: "bg-blue-100 text-blue-700",
    ALTA: "bg-orange-500 text-white",
    CRITICA: "bg-red-500 text-white",
  };

  return (
    <Chip className={colors[value] || "bg-gray-100 text-gray-700"} size="sm">
      {value}
    </Chip>
  );
}