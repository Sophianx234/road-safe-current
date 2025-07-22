'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export function RadialChartComponent() {
  const data = {
    labels: ['Risk Covered', 'Remaining'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#22c55e', '#e5e7eb'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zone Safety Score</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-56">
        <Doughnut data={data} cutout={'70%'} />
      </CardContent>
    </Card>
  );
}
