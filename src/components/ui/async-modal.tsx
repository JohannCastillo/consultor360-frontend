"use client";

import React, { useState } from "react";
import { Button, Modal, type ModalProps } from "antd";
import { useQueryClient } from "@tanstack/react-query";

interface AsyncModalProps extends ModalProps {
  triggerText: string;
  onConfirm: () => Promise<boolean>; // returns true if the operation was successful
  queryKey?: string[];
}

export default function AsyncModal(props: AsyncModalProps) {
  const { triggerText, onConfirm, queryKey, ...modalProps } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setConfirmLoading(true);
    const res = await onConfirm();

    if (res) {
      setOpen(false);
      // revalidate queries
      if (queryKey) {
        queryClient.invalidateQueries({
          queryKey,
        });
      }
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {triggerText}
      </Button>
      <Modal
        {...modalProps}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
}
