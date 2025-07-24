'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const data = [
  { year: '2018', vehicle: 233, pedestrian: 227, motorcyclist: 157, bicyclist: 13 },
  { year: '2019', vehicle: 228, pedestrian: 184, motorcyclist: 91, bicyclist: 2 },
  { year: '2020', vehicle: 191, pedestrian: 164, motorcyclist: 122, bicyclist: 4 },
  { year: '2021', vehicle: 113, pedestrian: 182, motorcyclist: 159, bicyclist: 5 },
  { year: '2022', vehicle: 146, pedestrian: 140, motorcyclist: 108, bicyclist: 4 },
];

const COLORS = {
  vehicle: '#1f77b4',       // Blue
  pedestrian: '#ff7f0e',    // Orange
  motorcyclist: '#2ca02c',  // Green
  bicyclist: '#d62728',     // Red
};

export default function RoadUserInjuriesChart() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 tracking-tight">
        Serious Injuries by Road User Type (2018–2022)
      </h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 30, right: 30, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" stroke="#555" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#555"
              tick={{ fontSize: 12 }}
              label={{
                value: 'Serious Injuries',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#555', fontSize: 12 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="vehicle"
              stroke={COLORS.vehicle}
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Vehicle Occupants"
            />
            <Line
              type="monotone"
              dataKey="pedestrian"
              stroke={COLORS.pedestrian}
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Pedestrians"
            />
            <Line
              type="monotone"
              dataKey="motorcyclist"
              stroke={COLORS.motorcyclist}
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Motorcyclists"
            />
            <Line
              type="monotone"
              dataKey="bicyclist"
              stroke={COLORS.bicyclist}
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Bicyclists"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
