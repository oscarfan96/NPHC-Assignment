import { useState } from "react";
import { Modal } from "antd"
import 'antd/dist/antd.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../../../api/employee";

const INITIAL_TEXT = 'Press confirm to delete';
const PROCESSING_TEXT = 'Deleting';
const TITLE = 'Delete employee';

const DeleteModal = (props: { employee: Employee, isShow: boolean; closeModal: any }) => {
  const queryClient = useQueryClient();
  const [modalText, setModalText] = useState(INITIAL_TEXT);

  const { isLoading, isError, mutate, reset } = useMutation(deleteEmployee, {
    onMutate: () => {
      setModalText(PROCESSING_TEXT);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
    onSettled: () => {
      setModalText(INITIAL_TEXT);
      props.closeModal();
    }
  });

  return isError ? < Modal visible={isError} onOk={reset} onCancel={reset}> <p>Oops! Something went wrong.</p></Modal > :
    <Modal data-testid="dlt-modal" title={TITLE} visible={props.isShow} onOk={() => mutate(props.employee.id)} confirmLoading={isLoading} onCancel={props.closeModal}>
      <p>{modalText}</p>
    </Modal >
}

export default DeleteModal;