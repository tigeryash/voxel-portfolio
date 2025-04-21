import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CameraStore = {
  position: [number, number, number];
  target: [number, number, number];
  setPosition: (position: [number, number, number]) => void;
  setTarget: (target: [number, number, number]) => void;
  resetCamera: () => void;
};

const DEFAULT_POSITION: [number, number, number] = [0, 100, 200];
const DEFAULT_TARGET: [number, number, number] = [0, 0, 0];

const STORAGE_KEY = "camera-storage";

const hasStoredPosition = () => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!!stored && stored !== "undefined") {
    return JSON.parse(stored);
  } else {
    return DEFAULT_POSITION;
  }
};

export const useCameraStore = create<CameraStore>()(
  persist(
    (set) => ({
      position: hasStoredPosition(),
      target: DEFAULT_TARGET,

      setPosition: (position) => set({ position }),
      setTarget: (target) => set({ target }),

      resetCamera: () => {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          console.warn("Failed to clear camera storage", e);
        } finally {
          set({
            position: DEFAULT_POSITION,
            target: DEFAULT_TARGET,
          });
        }
      },
    }),
    {
      name: STORAGE_KEY, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
