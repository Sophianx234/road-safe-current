'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export function LineChartComponent() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Accidents',
        data: [10, 25, 15, 30, 20],
        fill: false,
        borderColor: '#4f46e5',
        tension: 0.3,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accident Trend (Monthly)</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={data} />
      </CardContent>
    </Card>
  );
}
