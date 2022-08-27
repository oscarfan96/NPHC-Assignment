import { Table } from "antd";
import 'antd/dist/antd.css';

const employeeData = [
  {
    id: 'e0001',
    name: 'bpotter',
    login: 'Harry Potter',
    salary: '1234.00',
  },
  {
    id: 'e0002',
    name: 'epotter',
    login: 'Ron Weasley',
    salary: '1234.00',
  },
  {
    id: 'e0003',
    name: 'cpotter',
    login: 'Severus Snape',
    salary: '1235.00',
  },
  {
    id: 'e0004',
    name: 'apotter',
    login: 'Rubeus Hagrid',
    salary: '1237.00',
  },
  {
    id: 'e0005',
    name: 'hpotter',
    login: 'Lord Voldemort',
    salary: '1236.00',
  },
  {
    id: 'e0006',
    name: 'bpotter',
    login: 'Harry Potter',
    salary: '1234.00',
  },
  {
    id: 'e0007',
    name: 'epotter',
    login: 'Ron Weasley',
    salary: '1234.00',
  },
  {
    id: 'e0008',
    name: 'cpotter',
    login: 'Severus Snape',
    salary: '1235.00',
  },
  {
    id: 'e0009',
    name: 'apotter',
    login: 'Rubeus Hagrid',
    salary: '1237.00',
  },
  {
    id: 'e0010',
    name: 'hpotter',
    login: 'Lord Voldemort',
    salary: '1236.00',
  },
];

type Employee = typeof employeeData[0]

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
      <div><a>Edit</a>{'\n'}<a>Delete</a></div>
    ),
  },
];

const EmployeeTable = (props: any) => {
  return <Table dataSource={employeeData}
    columns={columns}
    pagination={{
      defaultPageSize: 5,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15'],
      position: ['bottomRight'],
    }}
  />;
}

export default EmployeeTable