
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ObjectId } from "mongodb";
import { Department } from "../models/department.entity";

export async function departmentGetAll(request: Request, response: Response) {
    const departmentRepository = getManager().getRepository(Department);
    const departments = await departmentRepository.find({order: {createdAt: "DESC"}});
    response.send(departments);
}

export async function departmentSave(request: Request, response: Response) {
    const departmentRepository = getManager().getRepository(Department);
    const department: Partial<Department> = request.body;
    department.createdAt = new Date();
    const saveDepartment  = await departmentRepository.save(department)
   
    response.send(saveDepartment);
}

export async function departmentUpdate(request: Request, response: Response) {
    const departmentRepository = getManager().getRepository(Department);
    const fee: Partial<Department> = request.body;
    const id = request.body._id;
    delete fee._id;
    const saveDepartment  = await departmentRepository.update(id, fee);
    response.send(saveDepartment);
}

export async function departmentGetById(request: Request, response: Response) {
    console.log(request.params)
    const id = request.params.id;
    const departmentRepository = getManager().getRepository(Department);
    const department = await departmentRepository.findOne({_id: new ObjectId(id) });
  
    response.send(department);
}

export async function departmentDeleteById(request: Request, response: Response) {
    const id = request.params.id;
    const departmentRepository = getManager().getRepository(Department);
    console.log(id)
    const deleteDepartment = await departmentRepository.delete(id);
  
    response.send(deleteDepartment);
}
