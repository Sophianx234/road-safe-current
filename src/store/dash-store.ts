import { create } from "zustand";

export type accidentTpe ={
    location: {
        lat: number,
        lng: number
    },
    date: string,
    year: number,
    region: string,
    vehicleType: string,
    accidentType: string,
    severity: string,
    fatalities: number,
    injuries: number,
    description: string
}
export type DashStoreProps = {
  showMap: boolean;
  toggleMap: () => void;

  showTable: boolean;
  toggleTable: () => void;

  showCumChart: boolean;
  toggleCumChart: () => void;

  showLineChart: boolean;
  toggleLineChart: () => void;

  showBarChart: boolean;
  toggleBarChart: () => void;

  showHotspots: boolean;
  toggleHotspots: () => void;

  showCards: boolean;
  toggleCards: () => void;
  showAI: boolean;
  toggleAI: () => void;
  showNotifications: boolean;
  toggleNotifications: () => void;  
  accidents: accidentTpe[];
  setAccidents: (accidents: accidentTpe[]) => void;
};

export const useDashStore = create<DashStoreProps>((set) => ({
  showMap: false,
  toggleMap: () => set((state) => ({ showMap: !state.showMap })),

  showTable: false,
  toggleTable: () => set((state) => ({ showTable: !state.showTable })),

  showCumChart: false,
  toggleCumChart: () => set((state) => ({ showCumChart: !state.showCumChart })),

  showLineChart: false,
  toggleLineChart: () => set((state) => ({ showLineChart: !state.showLineChart })),

  showBarChart: false,
  toggleBarChart: () => set((state) => ({ showBarChart: !state.showBarChart })),

  showHotspots: false,
  toggleHotspots: () => set((state) => ({ showHotspots: !state.showHotspots })),

  showCards: false,
  toggleCards: () => set((state) => ({ showCards: !state.showCards })),
  showAI: false,
  toggleAI: () => set((state) => ({ showAI: !state.showAI })),
  showNotifications: false,
  toggleNotifications: () => set((state) => ({ showNotifications: !state.showNotifications })),
  accidents: [],
  setAccidents: (accidents) => set(() => ({ accidents })),

}));
