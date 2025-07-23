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
  vehicle: '#912020',
  pedestrian: '#571616',
  motorcyclist: '#C59218',
  bicyclist: '#F5B888',
};

export default function RoadUserInjuriesChart() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-[#571616]">
        Serious injuries by road user type, 2018–2022
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 30, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" stroke="#333" />
            <YAxis
              label={{
                value: 'Number of serious injuries',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#555', fontSize: 12 },
              }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="vehicle"
              stroke={COLORS.vehicle}
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Vehicle occupants"
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
