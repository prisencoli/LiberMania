import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  suffix?: string;
};

export default function StatsCard({ title, value, icon, trend, suffix }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="material-icons text-primary-500">{icon}</span>
      </div>
      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {suffix && <p className="ml-2 text-sm text-gray-600 font-medium">{suffix}</p>}
        {trend && (
          <p className={`ml-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'} font-medium flex items-center`}>
            <span className="material-icons text-sm">
              {trend.isPositive ? 'arrow_upward' : 'arrow_downward'}
            </span>
            {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
