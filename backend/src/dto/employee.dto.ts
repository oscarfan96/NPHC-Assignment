import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetAllEmployeesDto {

  @IsOptional()
  @IsNumberString()
  minSalary?: number;

  @IsOptional()
  @IsNumberString()
  maxSalary?: number;

}

export class UpdateEmployeeDto {

  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsNumber()
  salary: number;
}
