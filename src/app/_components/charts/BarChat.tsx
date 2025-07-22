'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function BarChartComponent() {
  const data = {
    labels: ['Cars', 'Trucks', 'Motorbikes'],
    datasets: [
      {
        label: 'Accidents',
        data: [40, 15, 22],
        backgroundColor: ['#fb923c', '#facc15', '#f87171'],
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Type Accidents</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={data} />
      </CardContent>
    </Card>
  );
}
