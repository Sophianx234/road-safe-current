import { ReactNode } from 'react';

type RoadSafetyStatCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  change: string;
  changeType: 'up' | 'down';
  description?: string;
};

export default function RoadSafetyStatCard({
  title,
  value,
  icon,
  change,
  changeType,
  description,
}: RoadSafetyStatCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full transition hover:shadow-md">
      <div className="flex pr-5 items-center justify-between mb-2">
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <div className="text-gray-400 text-lg">{icon}</div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            changeType === 'up'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {changeType === 'up' ? '▲' : '▼'} {change}
        </span>
      </div>

      {description && (
        <p className="text-xs text-gray-400 mt-2">{description}</p>
      )}
    </div>
  );
}
