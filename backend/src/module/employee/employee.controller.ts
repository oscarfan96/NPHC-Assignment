import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAllEmployeesDto, UpdateEmployeeDto } from 'src/dto/employee.dto';
import { DefaultResponse } from 'src/type/general';
import { EmployeeService } from './employee.service';
import { Response } from 'express';

@Controller('employees')
export class EmployeeController {

  constructor(private employeeService: EmployeeService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEmployee(@Query() query: GetAllEmployeesDto): Promise<DefaultResponse> {
    
    const employees = await this.employeeService.all({
      minSalary: isNaN(Number(query.minSalary)) ? false : Number(query.minSalary),
      maxSalary: isNaN(Number(query.maxSalary)) ? false : Number(query.maxSalary),
    });

    return {
      isSuccess: true,
      result: { employees }
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEmployeeFile(@Res() res: Response,@UploadedFile() file: Express.Multer.File){
    if(file.mimetype !== 'text/csv'){
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'Invalid file type'
      });
    }

    const employees = await this.employeeService.convertBufferToJSON(file.buffer);
    const result = await this.employeeService.create(employees);

    return res.status(HttpStatus.CREATED).json({
      isSuccess: result.isSuccess,
      message: result.message,
    });
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