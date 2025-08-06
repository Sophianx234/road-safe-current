// 'use client';

// import { useEffect, useState } from 'react';

// type ChartData = {
//   year: string;
//   [key: string]: number | string;
// };

// export default function VehicleTypeTrends() {
//   const [chartData, setChartData] = useState<ChartData[]>([]);

//   useEffect(() => {
//     const fetchTrends = async () => {
//       try {
//         const res = await fetch('/api/accidents/vehicle-trends');
//         const { data } = await res.json();
//         setChartData(data);
//       } catch (err) {
//         console.error('Failed to load trends:', err);
//       }
//     };

//     fetchTrends();
//   }, []);

//   return <Barchat data={chartData} />;
// }
