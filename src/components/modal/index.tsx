import { ConfigProvider, Modal, ModalProps } from "antd";
import React, { FC, ReactNode } from "react";

interface IProps extends ModalProps {
  open: boolean;
  centered?: boolean;
  title?: string;
  onDismiss?: () => void;
  width?: string | number;
  children: ReactNode;
}

export const AppModal: FC<IProps> = ({
  open,
  title,
  children,
  onDismiss,
  centered = true,
  width,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "",
        },
      }}
    >
      <Modal
        {...props}
        open={open}
        centered={centered}
        width={width}
        title={title}
        onCancel={onDismiss}
        footer={null}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};
