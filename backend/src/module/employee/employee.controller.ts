import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateEmployeeDto } from 'src/dto/employee.dto';
import { DefaultResponse } from 'src/type/general';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {

  constructor(private employeeService: EmployeeService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEmployee(): Promise<DefaultResponse> {
    return {
      isSuccess: true,
      result: {
        employees: await this.employeeService.all()
      }
    }
  }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadEmployeeFile(@UploadedFile() file: Express.Multer.File): Promise<DefaultResponse> {
    const employees = await this.employeeService.convertBufferToJSON(file.buffer);
    const result = await this.employeeService.create(employees);

    return {
      isSuccess: result.isSuccess,
      errorMessage: result.errorMessage
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async edit(@Param('id') id: string, @Body() body: UpdateEmployeeDto){
    await this.employeeService.update(id, {
      name: body.name,
      salary: body.salary,
      login: body.login
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.employeeService.delete(id);
  }
}