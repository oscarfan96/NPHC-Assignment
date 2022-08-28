import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './module/employee/employee.module';

@Module({
  imports: [EmployeeModule, MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost/nest')],
})
export class AppModule { }
