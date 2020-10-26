import { Department } from './department.model';

export interface Employee {
    id?: string;
    _id?: string;
    name?: string;
    address?: string;
    province?: string;
    department?: Department;
    createdAt?: Date;
  }
