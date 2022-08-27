import { Table } from "antd";
import 'antd/dist/antd.css';
import { useState } from "react";
import DeleteModal from "./modal/delete";
import EditModal from "./modal/edit";

const employeeData = [
  {
    key: 'e0001',
    id: 'e0001',
    name: 'bpotter',
    login: 'Harry Potter',
    salary: '1234.00',
  },
  {
    key: 'e0002',
    id: 'e0002',
    name: 'epotter',
    login: 'Ron Weasley',
    salary: '1234.00',
  },
  {
    key: 'e0003',
    id: 'e0003',
    name: 'cpotter',
    login: 'Severus Snape',
    salary: '1235.00',
  },
  {
    key: 'e0004',
    id: 'e0004',
    name: 'apotter',
    login: 'Rubeus Hagrid',
    salary: '1237.00',
  },
  {
    key: 'e0005',
    id: 'e0005',
    name: 'hpotter',
    login: 'Lord Voldemort',
    salary: '1236.00',
  },
  {
    key: 'e0006',
    id: 'e0006',
    name: 'bpotter',
    login: 'Harry Potter',
    salary: '1234.00',
  },
  {
    key: 'e0007',
    id: 'e0007',
    name: 'epotter',
    login: 'Ron Weasley',
    salary: '1234.00',
  },
  {
    key: 'e0008',
    id: 'e0008',
    name: 'cpotter',
    login: 'Severus Snape',
    salary: '1235.00',
  },
  {
    key: 'e0009',
    id: 'e0009',
    name: 'apotter',
    login: 'Rubeus Hagrid',
    salary: '1237.00',
  },
  {
    key: 'e0010',
    id: 'e0010',
    name: 'hpotter',
    login: 'Lord Voldemort',
    salary: '1236.00',
  },
];

const EmployeeTable = () => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const showModal = (modalType: "DELETE" | "EDIT") => {
    switch (modalType) {
      case 'DELETE':
        return (): undefined => { setIsShowDeleteModal(true); return; };
      default:
        // set employee index
        return (): undefined => { setIsShowEditModal(true); return; };
    }
  };

  const closeModal = (modalType: "DELETE" | "EDIT") => {
    switch (modalType) {
      case 'DELETE':
        return (): undefined => { setIsShowDeleteModal(false); return; };
      default:
        return (): undefined => { setIsShowEditModal(false); return; };
    }
  };

  const columns = [
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
      render: () => (
        <div><a onClick={showModal("EDIT")}>Edit</a>{'\n'}<a onClick={showModal("DELETE")}>Delete</a></div>
      ),
    },
  ];

  return <><Table dataSource={employeeData}
    columns={columns}
    pagination={{
      defaultPageSize: 5,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15'],
      position: ['bottomRight'],
    }} />
    <DeleteModal isShow={isShowDeleteModal} closeModal={closeModal("DELETE")} />
    <EditModal employee={employeeData[0]} isShow={isShowEditModal} closeModal={closeModal("EDIT")} /></>
}

export default EmployeeTable