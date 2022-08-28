import { ChangeEvent, useEffect, useState } from "react";

import { Form, Input, Modal } from "antd"
import 'antd/dist/antd.css';
import { updateEmployee } from "../../../api/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const INITIAL_TEXT = 'Save';
const PROCESSING_TEXT = 'Saving';
const TITLE = 'Edit employee';

const EmployeeModalEdit = (props: { employee: Employee, isShow: boolean; closeModal: any }) => {

  const [inputs, setInputs] = useState<Employee>(props.employee);

  useEffect(()=>{
    setInputs(props.employee);
  },[props.employee])

  const handleChange = (event: ChangeEvent<{ name: string, value: string, type: string }>) => {
    const name = event.target.name;
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const queryClient = useQueryClient();
  const [modalText, setModalText] = useState(INITIAL_TEXT);


  const { isLoading, isError, mutate, reset } = useMutation(updateEmployee, {
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
  })

  return isError ? < Modal visible={isError} onOk={reset} onCancel={reset}> <p>Oops! Something went wrong.</p></Modal > :
    <Modal title={TITLE} visible={props.isShow} okText={modalText} onOk={() => mutate(inputs)} confirmLoading={isLoading} onCancel={props.closeModal}>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input placeholder="name" name="name" value={inputs.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Login">
          <Input placeholder="login" name="login" value={inputs.login} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Salary">
          <Input type="number" placeholder="salary" name="salary" value={inputs.salary} onChange={handleChange} />
        </Form.Item>
      </Form>
    </Modal >
}

export default EmployeeModalEdit;