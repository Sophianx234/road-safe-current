'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export function RadarChartComponent() {
  const data = {
    labels: ['Visibility', 'Road Condition', 'Speed', 'Lighting', 'Signage'],
    datasets: [
      {
        label: 'Area Risk Score',
        data: [2, 3, 5, 2, 4],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: '#ef4444',
        pointBackgroundColor: '#ef4444',
      },
    ],
  };

  return (
    <Card className='shadow border w-full border-gray-100'>
      <CardHeader>
        <CardTitle>Environmental Risk Factors</CardTitle>
      </CardHeader>
      <CardContent>
        <Radar data={data} />
      </CardContent>
    </Card>
  );
}
