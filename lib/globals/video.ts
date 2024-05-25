import { create } from "zustand";
import { Video } from "~/types/Video";

type VideoStore = {
  collection: Video[] | null;
  setCollection: (collection: Video[]) => void;
  video: Video | null;
  setVideo: (video: Video) => void;
  index?: number;
  setIndex: (index: number) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  collection: null,
  setCollection: (collection: Video[]) => set({ collection }),
  video: null,
  setVideo: (video: Video) => set({ video }),
  index: 0,
  setIndex: (index: number) => set({ index }),
}));
