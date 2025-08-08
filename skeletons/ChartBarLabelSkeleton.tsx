import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChartBarLabelSkeleton() {
  return (
    <Card className="w-full border border-gray-200 animate-pulse">
      <CardHeader>
        <CardTitle className="h-6 bg-gray-300 rounded w-48" />
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-gray-200 rounded" />
      </CardContent>
    </Card>
  )
}
