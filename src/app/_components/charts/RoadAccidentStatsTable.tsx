'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaCalendarAlt, FaCarCrash, FaChartLine } from 'react-icons/fa';

type AccidentStats = {
  year: number;
  totalAccidents: number;
  fatalAccidents: number;
  nonFatalAccidents: number;
};

const accidentData: AccidentStats[] = [
  { year: 2020, totalAccidents: 12162, fatalAccidents: 2400, nonFatalAccidents: 9762 },
  { year: 2021, totalAccidents: 13243, fatalAccidents: 2635, nonFatalAccidents: 10608 },
  { year: 2022, totalAccidents: 11908, fatalAccidents: 2234, nonFatalAccidents: 9674 },
  { year: 2023, totalAccidents: 12510, fatalAccidents: 2450, nonFatalAccidents: 10060 },
  { year: 2024, totalAccidents: 11800, fatalAccidents: 2102, nonFatalAccidents: 9698 },
];

export default function RoadAccidentStatsTable() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FaChartLine className="text-black" />
        Road Accident Statistics (2020 - 2024)
      </h2>

      <Table>
        <TableCaption className="text-sm text-gray-500 mt-2">
          Source: National Road Safety Authority, Ghana
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">
              <FaCalendarAlt className="inline-block mr-1 text-gray-600" />
              Year
            </TableHead>
            <TableHead>
              <FaCarCrash className="inline-block mr-1 text-red-500" />
              Total Accidents
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1">
                🚑 Fatal Accidents
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1">
                🛠 Non-Fatal Accidents
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {accidentData.map((data) => (
            <TableRow key={data.year}>
              <TableCell className="font-medium">{data.year}</TableCell>
              <TableCell>{data.totalAccidents.toLocaleString()}</TableCell>
              <TableCell>{data.fatalAccidents.toLocaleString()}</TableCell>
              <TableCell>{data.nonFatalAccidents.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
