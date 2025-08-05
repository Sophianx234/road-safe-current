"use client ";

import {
  FaAmbulance,
  FaCarCrash,
  FaSkullCrossbones,
  FaUserInjured,
} from "react-icons/fa";
import StatsCard, { RoadSafetyStatCardProps } from "./StatsCard";
import { useEffect, useState } from "react";
import { get } from "http";
import { accidentType, useDashStore } from "@/store/dash-store";
import StatsCardSkeleton from "../../../skeletons/CardSkeleton";
import { calculateStats, getChange } from "@/lib/helpers";

function StatCardsList() {
  const { accidentYear } = useDashStore();
  const [accidents, setAccidents] = useState<accidentType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getInformation = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/accidents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year: accidentYear,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setAccidents(data.accidents);
          console.log("Accidents Data:", data.accidents);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    getInformation();
  }, []);

  const {
    totalFatalAccidents,
    totalNonFatalAccidents,
    totalPersonsInjured,
    totalRoadAccidents,
  } = calculateStats(accidents);

  const availableYears = [2024, 2023, 2022, 2021];
  const [benchmarkYear, setBenchmarkYear] = useState<number | null>(null);
  const [benchmarkYearStats, setBenchmarkYearStats] = useState<
    accidentType[] | null
  >(null);

  const benchmarkStats = calculateStats(benchmarkYearStats||[]);
  const fatalChange = getChange(
    totalFatalAccidents,
    benchmarkStats.totalFatalAccidents
  );
  const nonFatalChange = getChange(
    totalNonFatalAccidents,
    benchmarkStats.totalNonFatalAccidents
  );
  const totalChange = getChange(
    totalRoadAccidents,
    benchmarkStats.totalRoadAccidents
  );
  const injuredChange = getChange(
    totalPersonsInjured,
    benchmarkStats.totalPersonsInjured
  );

  useEffect(() => {
    if(!benchmarkYear) return 
    const getBenmarkYearInformation = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("/api/accidents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({year:benchmarkYear }),
        });

        if (res.ok) {
          const data = await res.json();
          setBenchmarkYearStats(data.accidents);
        } else {
          console.warn("error", res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getBenmarkYearInformation();
  }, [setBenchmarkYear, benchmarkYear]);

  const statsData: RoadSafetyStatCardProps[] = [
    {
      title: "Fatal Accidents",
      value: totalFatalAccidents,
      icon: <FaSkullCrossbones />,
      change: fatalChange.change,
      changeType: fatalChange.changeType,
      description: benchmarkYear
        ? `Compared to ${benchmarkYear}`
        : "Compared to same period last year",
    },
    {
      title: "Non-Fatal Accidents",
      value: totalNonFatalAccidents,
      icon: <FaAmbulance />,
      change: nonFatalChange.change,
      changeType: nonFatalChange.changeType,
      description: benchmarkYear
        ? `Compared to ${benchmarkYear}`
        : "Compared to same period last year",
    },
    {
      title: "Total Road Accidents",
      value: totalRoadAccidents,
      icon: <FaCarCrash />,
      change: totalChange.change,
      changeType: totalChange.changeType,
      description: benchmarkYear
        ? `Compared to ${benchmarkYear}`
        : "Compared to same period last year",
    },
    {
      title: "Persons Injured",
      value: totalPersonsInjured,
      icon: <FaUserInjured />,
      change: injuredChange.change,
      changeType: injuredChange.changeType,
      description: benchmarkYear
        ? `Compared to ${benchmarkYear}`
        : "Compared to same period last year",
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600 mr-2">
          Benchmark Year:
        </label>
        <select
          className="px-3 py-1 border rounded-md bg-white text-sm text-gray-700"
          value={benchmarkYear ?? ""}
          onChange={(e) => setBenchmarkYear(Number(e.target.value))}
        >
          <option value="" disabled>
            Select year
          </option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {!isLoading &&
          statsData.map((stat, i) => <StatsCard key={i} {...stat} />)}
        {isLoading &&
          Array.from({ length: 4 }, (_, i) => <StatsCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export default StatCardsList;
