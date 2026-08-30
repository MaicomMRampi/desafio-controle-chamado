import { Card } from "@heroui/react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
  colorCard?: string
}

export function MetricCard({ title, value, icon: Icon, iconColor = "text-blue-500", colorCard }: MetricCardProps) {
  return (
    <Card className={`border border-slate-200/60 shadow-sm ${colorCard}`
    } >
      <Card.Content className="flex flex-row items-center justify-between p-4">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-slate-100 ${iconColor}`}>
          <Icon className="size-5" />
        </div>
      </Card.Content>
    </Card >
  );
}