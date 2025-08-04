"use client";

import { useDashStore } from "@/store/dash-store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {toast, Toaster} from 'react-hot-toast'
import {
  FaBus,
  FaCar,
  FaCarCrash,
  FaExclamationTriangle,
  FaFilter,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaTaxi,
  FaTruck,
  FaTruckMoving,
} from "react-icons/fa";

const years = ["2021", "2022", "2023", "2024"];

const types = [
  { label: "All", value: "", icon: <FaFilter /> },
  { label: "Car", value: "car", icon: <FaCar /> },
  { label: "Truck", value: "truck", icon: <FaTruck /> },
  { label: "Motorbike", value: "bike", icon: <FaMotorcycle /> },
  { label: "Bus", value: "bus", icon: <FaBus /> },
  { label: "Taxi", value: "taxi", icon: <FaTaxi /> },
  { label: "Long Vehicle", value: "long-vehicle", icon: <FaTruckMoving /> },
];


const accidentTypes = [
  "All",
  "collision",
  "pedestrian knockdown",
  "overturn",
  "run-off-road",
  "hit and run",
  "fire"
];
 
const regions = [
  "All",
  "ahafo",
  "ashanti",
  "bono",
  "bono east",
  "central",
  "eastern",
  "greater accra",
  "north east",
  "northern",
  "oti",
  "savannah",
  "upper east",
  "upper west",
  "volta",
  "western",
  "western north",
];

const severities = ["All", "fatal", "serious", "minor"];

export type FilterFields = {
  
  year: string;
  vehicleType: string;
  accidentType: string;
  region: string;
  severity: string;
};

export default function FleetFilter({
  onFilterChange,
}: {
  onFilterChange?: (filters: FilterFields) => void;
}) {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FilterFields>({
      defaultValues: {
        year: "",
        vehicleType: "",
        accidentType: "",
        region: "",
        severity: "",
      },
    });
    const {setAccidents} = useDashStore();
  const router = useRouter();

  const selectedType = watch("vehicleType");
const onSubmit = async (data: FilterFields) => {
  console.log("Selected Filters:", data);
  toast.loading("Fetching data...");

  const res = await fetch("/api/accidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if(res.ok){
    toast.dismiss();
    toast.success("Data fetched successfully!");
    console.log("Filtered Accidents:", result);
    setAccidents(result.accidents);
  }else{
    toast.dismiss();
    toast.error("Failed to fetch data: " + result.message);
  }
};

  const clearFilters = () => {
    reset();
    router.push("?");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <FaFilter className="text-black" /> Filters
        </h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Year */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Year</label>
        <select
          {...register("year")}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Vehicle Type</label>
        <div className="flex flex-wrap gap-2">
          {types.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setValue("vehicleType", item.value)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                selectedType === item.value
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-50 text-gray-700 hover:bg-orange-100 border-gray-300"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accident Type */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FaCarCrash className="text-gray-500" /> Accident Type
        </label>
        <select
          {...register("accidentType")}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {accidentTypes.map((type) => (
            <option key={type} value={type === "All" ? "" : type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-400" /> Region
        </label>
        <select
          {...register("region")}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {regions.map((r) => (
            <option key={r} value={r === "All" ? "" : r.toLowerCase()}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Severity */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FaExclamationTriangle className="text-gray-400" /> Severity
        </label>
        <select
          {...register("severity")}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {severities.map((s) => (
            <option key={s} value={s === "All" ? "" : s.toLowerCase()}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold text-sm transition"
        >
          Apply Filters
        </button>
      </div>
      <Toaster position="bottom-center"/>
    </form>
  );
}
