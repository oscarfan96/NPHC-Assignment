import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true  })
  login: string;

  @Prop({ required: true })
  salary: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);