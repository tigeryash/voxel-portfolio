import { create } from "zustand";

type SignStore = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  signTitle: string;
  setSignTitle: (signTitle: string) => void;
  closeModal: () => void;
};

export const useSignStore = create<SignStore>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  signTitle: "",
  setSignTitle: (signTitle) => set({ signTitle }),
  closeModal: () => set({ isModalOpen: false }),
}));
