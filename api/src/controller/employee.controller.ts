
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../models/employee.entity";
import { ObjectId } from "mongodb";

export async function employeeGetAll(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const employees = await employeeRepository.find({relations: ['departments'], order: {createdAt: "DESC"}});
    console.log(employees);
    response.send(employees);
}

export async function employeeSave(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const lastRecord =  await (await employeeRepository.findOne({order: {createdAt: 'DESC'}}));
    const employee: Partial<Employee> = request.body;
    employee.employeeCode = lastRecord && lastRecord.employeeCode ? lastRecord.employeeCode + 1 as number : 1;
    employee.createdAt = new Date();
    const saveEmployee  = await employeeRepository.save(employee)
   
    response.send(saveEmployee);
}

export async function employeeUpdate(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const employee: Partial<Employee> = request.body;
    const id = request.body._id;
    delete employee._id;
    const saveEmployee  = await employeeRepository.update(id, employee);
    console.log('save', employee)
    response.send(saveEmployee);
}

export async function employeeGetById(request: Request, response: Response) {
    const id = request.params.id;
    const employeeRepository = getManager().getRepository(Employee);
    const employee = await employeeRepository.findOne({_id: new ObjectId(id) });
    response.send(employee);
}

export async function employeeDeleteById(request: Request, response: Response) {
    const id = request.params.id;
    const employeeRepository = getManager().getRepository(Employee);
    const deleteEmployee = await employeeRepository.delete(id);
  
    response.send(deleteEmployee);
}

