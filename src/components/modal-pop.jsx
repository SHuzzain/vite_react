import { Modal } from "antd";
import React from "react";
const ModalPopUp = ({ isModalOpen, children, title, ...props }) => {
  return (
    <>
      <Modal title={title} open={isModalOpen} {...props}>
        {children}
      </Modal>
    </>
  );
};
export default ModalPopUp;
