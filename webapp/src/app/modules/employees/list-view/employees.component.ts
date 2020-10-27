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
import { startWith, map } from 'rxjs/operators';
import { Department } from 'src/app/shared/models/department.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  searchEmployeesForm = new FormGroup({
    name: new FormControl(''),
    department: new FormControl(''),
  });
  employeesList;
  buttonClass = 'none';
  displayedColumns: string[] = ['employeeCode', 'name', 'address', 'email', 'department', 'createdAt', 'action'];
  dataSource;
  filterPredicate: ((data: any, filter: string) => boolean);
  filteredOptions: Observable<Department[]>;
  options: Department[];
  arrivalStation: any;
  constructor(
    private router: Router,
    private apiEmployeeService: ApiEmployeeService,
    private dialog: MatDialog,
    private apiDepartmentService: ApiDepartmentService
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
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.getFilterPredicate();
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
        .subscribe((confirm: boolean) => {
          // if (confirm) {
          //   this.apiEmployeeService.deleteEmployee(employee._id)
          //   .subscribe(
          //     () => this.initSubscriptions()
          //   );
          // }
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
              () => this.initSubscriptions()
            );
          }
        }
      );
    }

  applyFilter() {
    const name = this.searchEmployeesForm.get('name').value;
    const department = this.searchEmployeesForm.get('department').value;

    const filterValue = name + '$' + department;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterPredicate() {
    return (row: Employee, filters: string) => {
      const filterArray = filters.split('$');
      const employeeName = filterArray[0];
      const employeeDepartment = filterArray[1];
      // const employeeAge = Number(filterArray[2]);
      const matchFilter = [];
      const name = row.name || '';
      const department = row.department as string || '';
      // const email = Number(row.email) || 9999999;
      const customFilterName = name.toLowerCase().includes(employeeName);
      const customFilterDepartments = department.includes(employeeDepartment);
      // const customFilterAge = email === employeeAge;
      matchFilter.push(customFilterName);
      matchFilter.push(customFilterDepartments);
      // matchFilter.push(customFilterAge);
      return matchFilter.every(Boolean);
    };
  }
}
