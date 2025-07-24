'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  FaMotorcycle,
  FaWalking,
  FaBicycle,
  FaCar,
} from 'react-icons/fa';

const data = [
  { name: 'Vehicle occupants', value: 37, icon: <FaCar className="text-blue-600" /> },
  { name: 'Pedestrians', value: 35, icon: <FaWalking className="text-orange-500" /> },
  { name: 'Motorcyclists', value: 27, icon: <FaMotorcycle className="text-green-600" /> },
  { name: 'Bicyclists', value: 1, icon: <FaBicycle className="text-red-500" /> },
];

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];

export default function InjuryDonutChart() {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${Math.round((data[index].value / total) * 100)}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-md">
      <h3 className="text-center text-lg font-bold mb-6 text-gray-800">
        Percentage Distribution of Serious Injuries by Road User Type (2022)
      </h3>

      <div className="flex flex-col justify-center items-center gap-6">
        {/* Chart */}
        <div className="w-full md:w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
                label={renderLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} incidents`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <ul className="grid grid-cols-2 gap-3 space-y-1">
          {data.map((item, index) => (
            <li key={item.name} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
