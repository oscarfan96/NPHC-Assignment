import { Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import * as csvtojsonV2 from 'csvtojson';
import { Employee, EmployeeDocument } from 'src/schema/employee.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { create } from 'node:domain';
import { async, buffer } from 'rxjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) { }

  async convertBufferToJSON(buffer: Buffer) {

    const readable = new Readable()
    readable._read = () => { }
    readable.push(buffer);
    readable.push(null);

    const employees: Employee[] = await readable.pipe(csvtojsonV2({
      noheader: true,
      trim: true,
      delimiter: ',',
      colParser: {
        "salary": "number",
      },
      headers: ['id', 'name', 'login', 'salary']
    }));
    return employees;
  }

  async all() {
    return await this.employeeModel.find();
  }

  async update(id: string, entities: { name: string, salary: number, login: string }) {
    return await this.employeeModel.collection.updateOne({ id }, { $set: entities });
  };

  async create(employees: Employee[]) {
    const session = await this.connection.startSession();
    
    session.startTransaction();
    try {
      await this.employeeModel.collection.insertMany(employees);
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      return { isSuccess: false, errorMessage: error.toString()}
    } 
    return { isSuccess: true };
  }

  async delete(id: string) {
    return await this.employeeModel.collection.deleteOne({ id });
  };
}
