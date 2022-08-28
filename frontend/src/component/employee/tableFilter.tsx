import { Form, Input } from "antd"
import { ChangeEvent } from "react";

const INPUT_PREFIX = '$';
const INPUT_SUFFIX = 'USD';

type Props = {
  filters: {
    minSalary?: number | undefined;
    maxSalary?: number | undefined;
  },
  setFilters: React.Dispatch<React.SetStateAction<{
    minSalary?: number | undefined;
    maxSalary?: number | undefined;
  }>>,
}
const EmployeeTableFilter = (props: Props) => {

  const handleChange = (event: ChangeEvent<{ name: string, value: string, type: string }>) => {
    const name = event.target.name;
    const value = event.target.value === '' || isNaN(Number(event.target.value)) ? undefined : Number(event.target.value);
    props.setFilters(values => ({ ...values, [name]: value }));
  }

  return <Form layout="vertical">
    <Form.Item label="Min Salary">
      <Input placeholder="Min Salary" name="minSalary" data-testid="input-min-salary" value={props.filters.minSalary ?? undefined} onChange={handleChange} prefix={INPUT_PREFIX} suffix={INPUT_SUFFIX} />
    </Form.Item>
    <Form.Item label="Max Salary">
      <Input placeholder="Max Salary" name="maxSalary" data-testid="input-max-salary" value={props.filters.maxSalary ?? undefined} onChange={handleChange} prefix={INPUT_PREFIX} suffix={INPUT_SUFFIX} />
    </Form.Item>
  </Form>
}

export default EmployeeTableFilter