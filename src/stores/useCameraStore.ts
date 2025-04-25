import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Vector3 } from "three";

type CameraStore = {
  position: Vector3;
  target: [number, number, number];
  setPosition: (position: Vector3) => void;
  setTarget: (target: [number, number, number]) => void;
  resetCamera: () => void;
};

const DEFAULT_POSITION: Vector3 = new Vector3(0, 0, 10);
const DEFAULT_TARGET: [number, number, number] = [0, 0, 0];

const STORAGE_KEY = "camera-storage";

const getStoredPosition = (): Vector3 => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return DEFAULT_POSITION;
    }

    // Parse the stored data - it contains the full persist state
    const parsedData = JSON.parse(storedData);

    // Check if the data has a state property with position
    if (parsedData && parsedData.state && parsedData.state.position) {
      const { x, y, z } = parsedData.state.position;
      // Ensure the position is a Vector3
      return new Vector3(x, y, z);
    }
    console.log("Stored camera position is invalid");
    return DEFAULT_POSITION;
  } catch (e) {
    console.warn("Failed to parse stored camera position", e);
    return DEFAULT_POSITION;
  }
};

export const useCameraStore = create<CameraStore>()(
  persist(
    (set) => ({
      position: getStoredPosition(),
      target: DEFAULT_TARGET,

      setPosition: (position) => set({ position }),
      setTarget: (target) => set({ target }),

      resetCamera: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
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
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
