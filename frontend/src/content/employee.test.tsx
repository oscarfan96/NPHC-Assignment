import { act, render, screen, waitFor, within } from '@testing-library/react';
import Employee from './employee';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { deleteEmployee, getEmployees, updateEmployee } from '../api/employee';
import employees from '../../mock-data/employee.mock-data';
import userEvent from '@testing-library/user-event';
import { message } from 'antd';
import { DraggerProps } from 'antd/lib/upload';

jest.mock('../api/employee', () => (
  {
    getEmployees: jest.fn(),
    updateEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
  }
));

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const { Upload } = antd;
  const { Dragger } = Upload;

  const customRequest = (req: { onSuccess: any }) => {
    setTimeout(() => {
      req.onSuccess('ok');
    }, 0);
  };

  const MockedDragger = (props: DraggerProps) => {
    return <Dragger {...props} customRequest={customRequest} />;
  };

  return {
    ...antd, Upload: { ...Upload, Dragger: MockedDragger }
  };
});

describe('Employee', () => {
  const queryClient = new QueryClient();

  describe('Get All', () => {

    test(" empty data", () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue([])
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );

      // Action

      // Assert
      expect(getEmployees).toBeCalledTimes(1);
      const table = screen.getByRole('table');
      expect(within(table).getByText('No Data')).toBeInTheDocument();
    });

    test(" with data", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue([{
        "_id": "123",
        "id": "mock-id",
        "login": "sample_login_id",
        "name": "sample employee name",
        "salary": 1234.5
      }, ...employees]);

      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );

      // Action

      // Assert
      expect(getEmployees).toBeCalledTimes(1);
      const table = screen.getByRole('table');
      await waitFor(() => expect(within(table).queryByText('No Data')).not.toBeInTheDocument());
      await waitFor(() => expect(within(table).getByText('sample employee name')).toBeInTheDocument());
    });

    test(" min salary filter is working", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue(employees);
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );

      // Action
      const minInputEl = screen.getByTestId('input-min-salary');
      userEvent.type(minInputEl, '1000');

      // Assert
      await waitFor(() => { expect(getEmployees).toBeCalledTimes(2) });
      await waitFor(() => { expect(getEmployees).toHaveBeenLastCalledWith({ minSalary: 1000 }) });

      // Action
      userEvent.clear(minInputEl);
      userEvent.type(minInputEl, '2345');

      // Assert
      await waitFor(() => { expect(getEmployees).toBeCalledTimes(3) });
      await waitFor(() => { expect(getEmployees).toHaveBeenLastCalledWith({ minSalary: 2345 }) });
    });

    test(" max salary filter is working", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue(employees);
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );

      // Action
      const maxInputEl = screen.getByTestId('input-max-salary');
      userEvent.type(maxInputEl, '1000');

      // Assert
      await waitFor(() => { expect(getEmployees).toBeCalledTimes(2) });
      await waitFor(() => { expect(getEmployees).toHaveBeenLastCalledWith({ maxSalary: 1000 }) });

      // Action
      userEvent.clear(maxInputEl);
      userEvent.type(maxInputEl, '2345');

      // Assert
      await waitFor(() => { expect(getEmployees).toBeCalledTimes(3) });
      await waitFor(() => { expect(getEmployees).toHaveBeenLastCalledWith({ maxSalary: 2345 }) });
    });
  });

  describe('Upload CSV', () => {

    test(" CSV file type validation", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue([]);
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );
      const files = [
        new File(['hello'], 'hello.png', { type: 'image/png' }),
        new File(['there'], 'there.png', { type: 'image/png' }),
        new File(['correct'], 'correct.csv', { type: 'text/csv' }),
      ]
      //@ts-ignore
      jest.spyOn(message, 'error').mockImplementationOnce(() => { })

      // Action
      const uploadCSVBtn = screen.getByTestId("btn-upload-csv");
      userEvent.click(uploadCSVBtn);
      const uploadDraggerInput = await waitFor(() => screen.getByTestId("upload-dragger"));
      await act(async () => userEvent.upload(uploadDraggerInput, files));

      // Assert
      expect(message.error).toBeCalledTimes(2);
      expect(message.error).toHaveBeenCalledWith('You can only upload text/csv file!');
    });

    test(" CSV file size validation", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue([]);
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );
      const file = new File(['bigFile'], 'bigFile.csv', { type: 'text/csv' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 * 3 });

      //@ts-ignore
      jest.spyOn(message, 'error').mockImplementationOnce(() => { })

      // Action
      const uploadCSVBtn = screen.getByTestId("btn-upload-csv");
      userEvent.click(uploadCSVBtn);
      const uploadDraggerInput = await waitFor(() => screen.getByTestId("upload-dragger"));
      await act(async () => userEvent.upload(uploadDraggerInput, [file, file]));

      // Assert
      expect(message.error).toBeCalledTimes(2);
      expect(message.error).toHaveBeenCalledWith('File must smaller than 2MB!');
    });

    test(" CSV file upload error", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue([]);
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );
      const file = new File(['bigFile'], 'bigFile.csv', { type: 'text/csv' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 * 3 });

      //@ts-ignore
      jest.spyOn(message, 'error').mockImplementationOnce(() => { })

      // Action
      const uploadCSVBtn = screen.getByTestId("btn-upload-csv");
      userEvent.click(uploadCSVBtn);
      const uploadDraggerInput = await waitFor(() => screen.getByTestId("upload-dragger"));
      await act(async () => userEvent.upload(uploadDraggerInput, [file, file]));

      // Assert
      expect(message.error).toBeCalledTimes(2);
      expect(message.error).toHaveBeenCalledWith('File must smaller than 2MB!');
    });

    test(" CSV file upload success", async () => {
      // Arrange
      (getEmployees as jest.Mock).mockReturnValue([]);
      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );
      const file = new File(['employees'], 'employees.csv', { type: 'text/csv' });

      //@ts-ignore
      jest.spyOn(message, 'success').mockImplementationOnce(() => { });
      Object.defineProperty(file, 'size', { value: 1 });

      // Action
      const uploadCSVBtn = screen.getByTestId("btn-upload-csv");
      userEvent.click(uploadCSVBtn);
      const uploadDraggerInput = await waitFor(() => screen.getByTestId("upload-dragger"));
      await act(async () => userEvent.upload(uploadDraggerInput, [file, file]));

      // Assert
      await waitFor(() => expect(message.success).toBeCalledTimes(2));
      await waitFor(() => expect(message.success).toHaveBeenCalledWith(`${file.name} file uploaded successfully.`));
      await waitFor(() => expect(getEmployees).toBeCalledTimes(5));
    });
  });

  describe('Update', () => {
    test(" CSV file upload error", async () => {
      const tmpEmployees = [{
        "_id": "123",
        "id": "mock-id",
        "login": "sample_login_id",
        "name": "sample employee name",
        "salary": 12
      }, ...employees];

      (getEmployees as jest.Mock).mockReturnValue(tmpEmployees);

      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );

      // Action
      await waitFor(() => expect(screen.getByTestId(`edit-btn-${tmpEmployees[0].id}`)).toBeInTheDocument());
      const editBtn = screen.getByTestId(`edit-btn-${tmpEmployees[0].id}`);
      userEvent.click(editBtn);
      await waitFor(() => expect(screen.getByTestId('edit-modal')).toBeInTheDocument());

      const nameInput = screen.getByTestId('input-name');
      await act(async () => userEvent.type(nameInput, '-abc'));
      const loginInput = screen.getByTestId('input-login');
      await act(async () => userEvent.type(loginInput, '-def'));
      const salaryInput = screen.getByTestId('input-salary');
      await act(async () => userEvent.type(salaryInput, '10'));

      const modal = screen.getByTestId('edit-modal')
      const saveBtn = within(modal).getAllByRole('button')?.[2];
      await act(async () => userEvent.click(saveBtn));

      // Action
      expect(getEmployees).toBeCalledTimes(2);
      expect(updateEmployee).toBeCalledWith({
        ...tmpEmployees[0],
        "name": tmpEmployees[0].name + '-abc',
        "login": tmpEmployees[0].login + '-def',
        "salary": Number(tmpEmployees[0].salary + '10'),
      });
    });
  });

  describe('Delete', () => {
    test(" CSV file upload error", async () => {
      const tmpEmployees = [{
        "_id": "123",
        "id": "mock-id",
        "login": "sample_login_id",
        "name": "sample employee name",
        "salary": 12
      }, ...employees];

      (getEmployees as jest.Mock).mockReturnValue(tmpEmployees);

      render(
        <QueryClientProvider client={queryClient}>
          <Employee />
        </QueryClientProvider>
      );

      // Action
      await waitFor(() => expect(screen.getByTestId(`dlt-btn-${tmpEmployees[0].id}`)).toBeInTheDocument());
      const dltBtn = screen.getByTestId(`dlt-btn-${tmpEmployees[0].id}`);
      userEvent.click(dltBtn);
      await waitFor(() => expect(screen.getByTestId('dlt-modal')).toBeInTheDocument());

      const modal = screen.getByTestId('dlt-modal')
      const okBtn = within(modal).getAllByRole('button')?.[2];
      await act(async () => userEvent.click(okBtn));

      // Action
      expect(getEmployees).toBeCalledTimes(2);
      expect(deleteEmployee).toBeCalledWith(tmpEmployees[0].id);
    });
  });
})
