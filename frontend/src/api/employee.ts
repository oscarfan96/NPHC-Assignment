import axios from "axios";

const employeesApi = axios.create({
  baseURL: 'http://localhost:3001'
})

export const getEmployees = async (filters: { minSalary?: number, maxSalary?: number }) => {

  const response = await employeesApi.get<{ isSuccess: boolean; result: { employees: Employee[] }; }>('/employees', {
    params: {
      minSalary: filters.minSalary,
      maxSalary: filters.maxSalary
    }
  });
  return response.data.result.employees;
}

export const updateEmployee = async ({ id, ...entities }: Employee) => {
  const response = await employeesApi.put(`/employees/${id}`, entities);
  return response;
}

export const deleteEmployee = async (employeeId: string) => {
  const response = await employeesApi.delete(`/employees/${employeeId}`);
  return response;
}


export default employeesApi;