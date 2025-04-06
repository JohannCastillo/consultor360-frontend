import { AlertProps } from "antd";
import { create } from "zustand";

interface SonnerState {
  visible: boolean;
  showAlert: (alertProps: AlertProps) => void;
  closeAlert: () => void;
  alertProps?: AlertProps;
}

export const useSonnerStore = create<SonnerState>((set) => ({
  visible: false,
  showAlert: (alertProps) => set({ visible: true, alertProps }),
  closeAlert: () => set({ visible: false, alertProps: undefined }),
}));
