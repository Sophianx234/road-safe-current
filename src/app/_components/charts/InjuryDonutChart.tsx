'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Label,
} from 'recharts';
import {
  FaMotorcycle,
  FaWalking,
  FaBicycle,
  FaCar,
} from 'react-icons/fa';

const data = [
  { name: 'Vehicle occupants', value: 37, icon: <FaCar /> },
  { name: 'Pedestrians', value: 35, icon: <FaWalking /> },
  { name: 'Motorcyclists', value: 27, icon: <FaMotorcycle /> },
  { name: 'Bicyclists', value: 1, icon: <FaBicycle /> },
];

const COLORS = ['#A93226', '#641E16', '#DC9F00', '#F5CBA7'];

export default function InjuryDonutChart() {
  // Total value for percentage calculation
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  // Custom label for displaying percentage
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
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
    <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
      <h3 className="text-center text-md font-semibold mb-4 text-[#7B241C]">
        Percentage distribution of serious injuries by road user type, 2022
      </h3>

      <ResponsiveContainer width="100%" height={300}>
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} incidents`} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
            formatter={(value: string, entry) => {
              const item = data.find((d) => d.name === value);
              return (
                <span className="flex flex-col items-center  text-sm text-gray-700">
                  {item?.icon} {value}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
