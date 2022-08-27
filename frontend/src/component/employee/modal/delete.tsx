import { useState } from "react";
import { Modal } from "antd"
import 'antd/dist/antd.css';


const DeleteModal = (props: { isShow: boolean; closeModal: () => undefined }) => {

  const initialText = 'Press confirm to delete';
  const processingText = 'Deleting';
  const [isLoading, setisLoading] = useState(false);
  const [modalText, setModalText] = useState(initialText);

  const handleOk = () => {
    setModalText(processingText);
    setisLoading(true);
    // mock delete process
    setTimeout(() => {
      props.closeModal();
      setisLoading(false);
      setModalText(initialText);
    }, 2000);
  };

  return <Modal visible={props.isShow} onOk={handleOk} confirmLoading={isLoading} onCancel={props.closeModal}>
    <p>{modalText}</p>
  </Modal >
}

export default DeleteModal;