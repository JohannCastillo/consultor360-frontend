"use client";
import { useSonnerStore } from "@/stores/sonner.store";
import { Alert } from "antd";
import { useEffect } from "react";

export default function Sonner() {
  const { visible, alertProps, closeAlert } = useSonnerStore();

  // close after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        closeAlert();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, closeAlert]);

  return visible ? (
    <Alert
      closable
      onClose={closeAlert}
      showIcon
      className="fixed bottom-4 right-10"
      style={{
        zIndex: 999999
      }}
      {...alertProps}
    />
  ) : null;
}
