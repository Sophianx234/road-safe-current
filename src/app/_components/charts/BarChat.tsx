'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export function BarChartComponent() {
  const data = {
    labels: [
      'Cars',
      'Trucks',
      'Motorbikes',
      'Bicycles',
      'Buses',
      'Vans',
      'Tricycles',
      'SUVs',
    ],
    datasets: [
      {
        label: 'Accidents Reported',
        data: [40, 15, 22, 8, 11, 17, 6, 10],
        backgroundColor: [
          '#60a5fa', // Cars - Blue
          '#34d399', // Trucks - Green
          '#f87171', // Motorbikes - Red
          '#fbbf24', // Bicycles - Yellow
          '#a78bfa', // Buses - Purple
          '#f472b6', // Vans - Pink
          '#fb923c', // Tricycles - Orange
          '#38bdf8', // SUVs - Sky
        ],
        borderRadius: 8,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#4b5563',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw} incidents`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.3)',
        },
      },
      y: {
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          stepSize: 10,
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.3)',
        },
      },
    },
  };

  return (
    <Card className="shadow-md border w-full border-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-700 text-base font-semibold">
          Vehicle Type Accidents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-6 px-2">
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
