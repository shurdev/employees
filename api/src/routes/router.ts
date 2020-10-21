import { departmentDeleteById, departmentGetAll, departmentGetById, departmentSave, departmentUpdate } from "../controller/department.controller";
import { employeeGetAll, employeeGetById, employeeSave, employeeDeleteById, employeeUpdate } from "../controller/employee.controller";

export const AppRoutes = [
    {
        path: "/employees",
        method: "get",
        action: employeeGetAll
    },
    {
        path: "/employees/:id",
        method: "get",
        action: employeeGetById
    },
    {
        path: "/employees",
        method: "post",
        action: employeeSave
    },
    {
        path: "/employees/:id",
        method: "delete",
        action: employeeDeleteById
    },
    {
        path: "/employees",
        method: "patch",
        action: employeeUpdate
    },
    {
        path: "/departments",
        method: "get",
        action: departmentGetAll
    },
    {
        path: "/departments/:id",
        method: "get",
        action: departmentGetById
    },
    {
        path: "/departments",
        method: "post",
        action: departmentSave
    },
    {
        path: "/departments/:id",
        method: "delete",
        action: departmentDeleteById
    },
    {
        path: "/departments",
        method: "patch",
        action: departmentUpdate
    },
];