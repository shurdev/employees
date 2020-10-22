import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEmployeeService } from 'src/app/core/http/api-employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/models/employee.model';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { DialogConfirmComponent } from 'src/app/shared/material/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends BaseComponent implements OnInit, OnDestroy {
  employeesList;
  buttonClass = 'none';
  displayedColumns: string[] = ['employeeCode', 'name', 'address', 'age', 'createdAt', 'action'];
  dataSource;

  constructor(
    private router: Router,
    private apiEmployeeService: ApiEmployeeService,
    private dialog: MatDialog
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
        }
      )
    );
  }

  changeStyle($event){
    this.buttonClass = $event.type == 'mouseover' ? 'animacionVer' : 'null';
  }

  openDetail(item?) {
    this.router.navigate(['/employees', item.id]);
  }

  createEmployee(item?) {
    this.router.navigate(['/employees/new']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  assignDepartment(employee: Employee) {
    console.log(employee);
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
  ngOnDestroy() {
  }
}
