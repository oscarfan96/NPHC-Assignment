import EmployeeTable from "../component/employee/table"
import EmployeeTableFilter from "../component/employee/tableFilter"
import 'antd/dist/antd.css';
import { Button, Typography } from 'antd';
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employee";
import { useEffect, useState } from "react";
import UploadModal from "../component/employee/modal/upload";

const { Title } = Typography;

const Employee = () => {

  const [filters, setFilters] = useState<{ minSalary?: number, maxSalary?: number }>({
    minSalary: undefined,
    maxSalary: undefined,
  });

  const { data: employees, refetch } = useQuery(['employees'], () => getEmployees(filters));
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);

  // to debounce
  useEffect(() => {
    const timer = setTimeout(() => refetch(), 500);
    // clear timer
    return () => clearTimeout(timer);
  }, [filters])

  return <><Title>Employees</Title>
    <EmployeeTableFilter filters={filters} setFilters={setFilters} />
    <Button data-testid="btn-upload-csv" onClick={() => setIsShowUploadModal(true)} type="primary" block>Upload CSV</Button>
    <EmployeeTable employeesData={employees} />
    <UploadModal isShow={isShowUploadModal} closeModal={() => setIsShowUploadModal(false)} />
  </>
}

export default Employee