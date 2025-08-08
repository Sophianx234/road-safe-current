"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ChartBarLabelSkeleton } from "../../../../skeletons/ChartBarLabelSkeleton"

const chartConfig = {
  car: { label: "Car", color: "var(--chart-1)" },
  bus: { label: "Bus", color: "var(--chart-2)" },
  bike: { label: "Bike", color: "var(--chart-3)" },
  taxi: { label: "Taxi", color: "var(--chart-4)" },
  truck: { label: "Truck", color: "var(--chart-5)" },
  "long-vehicle": { label: "Long Vehicle", color: "var(--chart-6)" },
}

export function ChartBarLabel() {
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    
    const fetchData = async () => {
        try{
        setIsLoading(true)
        const res = await fetch("/api/accidents/vehicle-trends")
        if(res.ok){
          
          const { data } = await res.json()
          setChartData(data)
        }
      }catch(err){
        console.error("Error fetching vehicle trends data:", err)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
if(isLoading) return <ChartBarLabelSkeleton />
if(!isLoading)
  return (
    <Card className="w-full border border-gray-200">
      <CardHeader>
        <CardTitle>Fatal Accidents by Vehicle Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="taxi" fill="#f97316" />
            <Bar dataKey="bike" fill="#10b981" />
            <Bar dataKey="car" fill="#3b82f6" />
            <Bar dataKey="truck" fill="#9333ea" />
            <Bar dataKey="long-vehicle" fill="#ef4444" />
            <Bar dataKey="bus" fill="#eab308" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
