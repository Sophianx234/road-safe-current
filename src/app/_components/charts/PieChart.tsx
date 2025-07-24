'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import {
  FaTachometerAlt,
  FaWineBottle,
  FaTools,
} from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip);

// Define colors per cause
const COLORS: Record<string, string> = {
  Overspeeding: '#D97706',    // Muted orange
  'Drunk Driving': '#7C3AED', // Muted purple
  'Brake Failure': '#059669', // Muted green
};

// Define icons per cause
const ICONS: Record<string, JSX.Element> = {
  Overspeeding: <FaTachometerAlt />,
  'Drunk Driving': <FaWineBottle />,
  'Brake Failure': <FaTools />,
};

export function PieChartComponent() {
  const labels = ['Overspeeding', 'Drunk Driving', 'Brake Failure'];

  const data = {
    labels,
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: labels.map((label) => COLORS[label]),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card className="shadow-sm border border-gray-100 w-full max-w-sm mx-auto rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-800 text-center">
          Top Causes of Accidents
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-60">
          <Pie data={data} options={options} />
        </div>

        {/* Custom icon legend */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-700">
          {labels.map((label) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="text-lg"
                style={{ color: COLORS[label] }}
              >
                {ICONS[label]}
              </span>
              <span className="text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
