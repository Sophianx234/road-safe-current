export default function StatsCardSkeleton() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full animate-pulse">
      <div className="flex pr-5 items-center justify-between mb-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
      </div>

      <div className="h-3 w-32 bg-gray-200 rounded mt-4"></div>
    </div>
  );
}
