'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChartComponent() {
  const data = {
    labels: ['Overspeeding', 'Drunk Driving', 'Brake Failure'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#f97316', '#f43f5e', '#10b981'],
      },
    ],
  };

  return (
    <Card className='shadow border w-full border-gray-100'>
      <CardHeader>
        <CardTitle>Top Causes of Accidents</CardTitle>
      </CardHeader>
      <CardContent>
        <Pie data={data} />
      </CardContent>
    </Card>
  );
}
