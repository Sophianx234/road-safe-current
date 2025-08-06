"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"

const chartConfig: ChartConfig = {
  car: { label: "Car", color: "var(--chart-1)" },
  bus: { label: "Bus", color: "var(--chart-2)" },
  bike: { label: "Bike", color: "var(--chart-3)" },
  taxi: { label: "Taxi", color: "var(--chart-4)" },
  truck: { label: "Truck", color: "var(--chart-5)" },
  "long-vehicle": { label: "Long Vehicle", color: "var(--chart-6)" },
}

export function ChartBarLabel() {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/accidents/fatal-by-vehicle")
      const { data } = await res.json()
      setChartData(data)
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fatal Accidents by Vehicle Type</CardTitle>
        <CardDescription>Grouped by Year</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={8}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 12.3% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing fatal accidents by vehicle type from 2021 to 2024
        </div>
      </CardFooter>
    </Card>
  )
}
