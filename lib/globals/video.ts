import { create } from "zustand";
import { Video } from "~/types/Video";

type VideoStore = {
  video: Video | null;
  setVideo: (video: Video) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  video: null,
  setVideo: (video: Video) => set({ video }),
}));
