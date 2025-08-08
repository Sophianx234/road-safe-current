"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface VehicleTrendRecord {
  year: string;
  taxi: number;
  truck: number;
  car: number;
  bike: number;
  "long-vehicle": number;
  bus: number;
}

const VEHICLE_TYPES = [
  "taxi",
  "truck",
  "car",
  "bike",
  "long-vehicle",
  "bus",
] as const;

const COLORS = [
  "#f97316", // taxi - orange
  "#9333ea", // truck - purple
  "#3b82f6", // car - blue
  "#10b981", // bike - green
  "#ef4444", // long-vehicle - red
  "#eab308", // bus - yellow
];

export function LineChartComponent() {
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendData() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/accidents/vehicle-trends");
        if (!res.ok) throw new Error("Failed to fetch");
        const {data} = await res.json();
        console.log("Fetched data:", data);

        const labels = (data as VehicleTrendRecord[]).map((item) => item.year);

        // Build datasets for each vehicle type
        const datasets = VEHICLE_TYPES.map((vehicleType, idx) => ({
          label: vehicleType.replace("-", " ").toUpperCase(),
          data: (data as VehicleTrendRecord[]).map((item) => item[vehicleType]),
          fill: false,
          borderColor: COLORS[idx],
          backgroundColor: COLORS[idx],
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        }));

        setChartData({ labels, datasets });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendData();
  }, []);

  return (
    <Card className="shadow border w-full border-gray-100">
      <CardHeader>
        <CardTitle>Accident Trend by Vehicle Type (Yearly)</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] animate-pulse bg-gray-200 rounded-md" />
        ) : (
          <Line className="w-full" data={chartData} />
        )}
      </CardContent>
    </Card>
  );
}
