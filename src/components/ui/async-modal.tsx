"use client";

import React, { useState } from "react";
import { Button, Modal, type FormInstance, type ModalProps } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api-response";
import { useApiResponseHandler } from "@/hooks/use-api-response-handler";

interface AsyncModalProps<T, K> extends ModalProps {
  trigger: React.ReactElement | string;
  onConfirm: () => Promise<ApiResponse<K>>;
  queryKey?: string[];

  form?: FormInstance<T>;
}

/**
 * @description This componente is used to handle asynchronous operations with or without forms and
 * Tanstack Query for data fetching.
 *
 * @template T: type of the form values
 * @template K: type of the response data in fetching
 */
export default function AsyncModal<T, K>(props: AsyncModalProps<T, K>) {
  const { trigger, onConfirm, queryKey, form, ...modalProps } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();
  const { handleError } = useApiResponseHandler();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);

      // handle form validation if it is provided
      if (form) {
        await form.validateFields();
      }

      // call the promise function
      const res = await onConfirm();

      // handle response error
      if (!res.success) {
        handleError(res);
      }

      // if it is successful, close the modal and revalidate data
      if (res.success) {
        setOpen(false);

        if (queryKey) {
          queryClient.invalidateQueries({
            queryKey,
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {typeof trigger === "string" ? (
        <Button type="primary" onClick={showModal}>
          {trigger}
        </Button>
      ) : (
        React.isValidElement(trigger) &&
        React.cloneElement(trigger as React.ReactElement, {
          onClick: showModal,
        })
      )}
      <Modal
        {...modalProps}
        okText={props.okText || "Aceptar"}
        cancelText={props.cancelText || "Cancelar"}
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
