import { IsNumber, IsString } from "class-validator";

export class UpdateEmployeeDto {

  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsNumber()
  salary: number;
}
