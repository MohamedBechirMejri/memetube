import { create } from "zustand";
import { Settings } from "~/types/Settings";

type SettingsStore = {
  settings: Settings;
  toggleMuted: () => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    muted: true,
  },
  toggleMuted: () =>
    set((state) => ({
      settings: { ...state.settings, muted: !state.settings.muted },
    })),
}));
