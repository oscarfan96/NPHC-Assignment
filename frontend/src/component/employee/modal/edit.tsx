import { useState } from "react";
import { Form, Input, Modal } from "antd"
import 'antd/dist/antd.css';


const EmployeeModalEdit = (props: { employee: Employee, isShow: boolean; closeModal: () => undefined }) => {

  const title = 'Edit';
  const [isLoading, setisLoading] = useState(false);

  const handleOk = () => {
    setisLoading(true);
    // mock delete process
    setTimeout(() => {
      props.closeModal();
      setisLoading(false);
    }, 2000);
  };

  return <Modal title={title} visible={props.isShow} onOk={handleOk} confirmLoading={isLoading} onCancel={props.closeModal}>
    <Form layout="horizontal">
      <Form.Item label="Name">
        <Input placeholder="input placeholder" value={props.employee.name} />
      </Form.Item>
      <Form.Item label="Login">
        <Input placeholder="input placeholder" value={props.employee.login} />
      </Form.Item>
      <Form.Item label="Salary">
        <Input placeholder="input placeholder" value={props.employee.name} />
      </Form.Item>
    </Form>
  </Modal >
}

export default EmployeeModalEdit;