import { Divider, Table } from "antd";
import 'antd/dist/antd.css';
import { useRef, useState } from "react";
import DeleteModal from "./modal/delete";
import EditModal from "./modal/edit";
import '../../style/employee.css';

const EmployeeTable = (props: { employeesData: Employee[] | undefined }) => {

  // QUERIES
  const selectedEmployee = useRef<Employee>();

  // MODAL 
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const showModal = (modalType: "DELETE" | "EDIT", employee: Employee) => {
    selectedEmployee.current = employee;
    switch (modalType) {
      case 'DELETE':
        setIsShowDeleteModal(true);
        break;
      default:
        setIsShowEditModal(true);
    }
  };

  return <>
    <Divider />
    <Table dataSource={props.employeesData}
      columns={[
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          sorter: (a: Employee, b: Employee) => a.id.localeCompare(b.id),
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
        },
        {
          title: 'Login',
          dataIndex: 'login',
          key: 'login',
          sorter: (a: Employee, b: Employee) => a.login.localeCompare(b.login),
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          key: 'salary',
          sorter: (a: Employee, b: Employee) => Number(a.salary) - Number(b.salary),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_: any, record: Employee) => {
            return (
              <div><a onClick={() => showModal("EDIT", record)}>Edit </a>{'\n'}<a onClick={() => showModal("DELETE", record)}>Delete</a></div>
            )
          },
        },
      ]}
      rowKey="id"
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15'],
        position: ['bottomRight'],
      }} />
    {selectedEmployee.current ? <><DeleteModal employee={selectedEmployee.current} isShow={isShowDeleteModal} closeModal={() => setIsShowDeleteModal(false)} /></> : ''}
    {selectedEmployee.current ? <><EditModal employee={selectedEmployee.current} isShow={isShowEditModal} closeModal={() => setIsShowEditModal(false)} /></> : ''}
  </>
}

export default EmployeeTable