import { create } from "zustand";

export type dashstoreProps = {
  showMap: boolean;
  setShowMap: (value: boolean) => void;
  showTable: boolean;
  setShowTable: (value: boolean) => void;
  showPieChart: boolean;
  setShowPieChart: (value: boolean) => void;
  showLineChart: boolean;
  setShowLineChart: (value: boolean) => void;
  showDonutChart: boolean;
  setShowDonutChart: (value: boolean) => void;
  showHotspots: boolean;
  setShowHotspots: (value: boolean) => void;
  showCards: boolean;
  setShowCards: (value: boolean) => void;
};
export const useDashStore = create<dashstoreProps>((set) => ({
  showMap: false,
  setShowMap: (value) => set({ showMap: value }),
  showTable: false,
  setShowTable: (value) => set({ showTable: value }),
  showPieChart: false,
  setShowPieChart: (value) => set({ showPieChart: value }),
  showLineChart: false,
  setShowLineChart: (value) => set({ showLineChart: value }),
  showDonutChart: false,
  setShowDonutChart: (value) => set({ showDonutChart: value }),
  showHotspots: false,
  setShowHotspots: (value) => set({ showHotspots: value }),
  showCards: false,
  setShowCards: (value) => set({ showCards: value }),
}));
