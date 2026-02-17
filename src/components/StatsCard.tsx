import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.positive ? 'text-green-600' : 'text-destructive'}`}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{trend.value}% from last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-foreground" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
