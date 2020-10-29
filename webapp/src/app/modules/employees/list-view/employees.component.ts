import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEmployeeService } from 'src/app/core/http/api-employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee.model';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { DialogConfirmComponent } from 'src/app/shared/material/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignDialogComponent } from '../assign-dialog/assign-dialog.component';
import { Observable } from 'rxjs';
import { Department } from 'src/app/shared/models/department.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false}) sortData: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  searchEmployeesForm = new FormGroup({
    name: new FormControl(''),
    department: new FormControl(''),
    createdAt: new FormControl(''),
  });
  employeesList;
  buttonClass = 'none';
  displayedColumns: string[] = ['employeeCode', 'name', 'address', 'email', 'department', 'createdAt', 'action'];
  dataSource;
  filteredOptions: Observable<Department[]>;
  options: Department[];
  arrivalStation: any;
  constructor(
    private router: Router,
    private apiEmployeeService: ApiEmployeeService,
    private dialog: MatDialog,
    private apiDepartmentService: ApiDepartmentService,
    private snackBar: MatSnackBar
    ) {
    super();
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.addSubscription(
      this.employeesList = this.apiEmployeeService.getEmployees().subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sortData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.getFilter();
        }
      )
    );
    this.addSubscription(
      this.apiDepartmentService.getDepartments().subscribe(
      data => this.options = data
    ));
  }


  displayOption(option) {
    return option ? option.name : undefined;
  }

  changeStyle($event){
    this.buttonClass = $event.type === 'mouseover' ? 'showAnimation' : 'null';
  }

  openDetail(item?) {
    this.router.navigate(['/employees', item.id]);
  }

  createEmployee(item?) {
    this.router.navigate(['/employees/new']);
  }

  assignDepartment(employee: Employee) {
      this.dialog
        .open(AssignDialogComponent, {
          data: employee
        })
        .afterClosed()
        .subscribe((empo: boolean) => {
          if (confirm) {
            this.openSnackBar('Departamento asignado correctamente', 'Actualizar');
          }
        }
      );
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['/employees', employee._id]);
  }

  deleteEmployee(employee: Employee) {
      this.dialog
        .open(DialogConfirmComponent, {
          data: `¿Está seguro de que desea borrar el empleado ${employee.name}?`
        })
        .afterClosed()
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.apiEmployeeService.deleteEmployee(employee._id)
            .subscribe(
              () => {
                this.openSnackBar(`Usuario ${employee.name} eliminado correctamente.`, 'Eliminar');
                this.initSubscriptions();
              }
            );
          }
        }
      );
    }

  filterList() {
    const name = this.searchEmployeesForm.get('name').value;
    const department = this.searchEmployeesForm.get('department').value;
    const date = this.searchEmployeesForm.get('createdAt').value;
    const createdAt = (date === null || date === '') ? '' : new Date(date).toLocaleDateString();

    const filterValue = name + '$$' + department + '$$' + createdAt;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilter() {
    return (row: Employee, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split('$$');
      const name = row.name || '';
      const department = row.department as string || '';
      const columnCreatedAt = new Date(row.createdAt);

      matchFilter.push(name.toLowerCase().includes(filterArray[0]));
      matchFilter.push(department.includes(filterArray[1]));
      matchFilter.push(columnCreatedAt.toLocaleDateString().toLowerCase() >= filterArray[2]);

      return matchFilter.every(Boolean);
    };
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, type, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['red-snackbar']
    });
  }
}
