import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiEmployeeService } from 'src/app/core/http/api-employee.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/material/dialog-confirm/dialog-confirm.component';
import { Department } from 'src/app/shared/models/department.model';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './employees.detail-view.component.html',
  styleUrls: ['./employees.detail-view.component.scss']
})
export class EmployeesDetailViewComponent extends BaseComponent implements OnInit {
  employeeForm = new FormGroup({
    _id: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required,Validators.minLength(10)]),
    department: new FormControl(''),
  });
  options: Department[];

  disabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private apiEmployeeService: ApiEmployeeService,
    private apiDepartmentService: ApiDepartmentService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.addSubscription(
      this.route.params.subscribe(
        (params: Employee) => {
          if (params.id) {
            this.apiEmployeeService.getEmployeeById(params.id).subscribe((data: any) => {
              this.employeeForm.reset(data);
            });
          }
        }
      )
    );

    this.addSubscription(
      this.apiDepartmentService.getDepartments().subscribe(
      departments => this.options = departments
    ));
  }

  submit(employee?) {
    this.apiEmployeeService.postEmployees(employee).subscribe(
      () => {
        this.openSnackBar('Empleado guardado correctamente', 'Guardar');
        this.return();
      }
    );
  }

  openDeleteEmployeeDialog(employee: Employee) {
    this.dialog
      .open(DialogConfirmComponent, {
        data: `¿Está seguro de que desea borrar el empleado ${employee.name}?`
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.delete(employee);
        }
      }
    );
  }

  delete(employee) {
    this.apiEmployeeService.deleteEmployee(employee._id).subscribe(
      () => {
        this.openSnackBar(`Empleado eliminado correctamente`, 'Eliminar');
        this.return();
      }
    );
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, type, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['red-snackbar']
    });
  }

  return() {
    this.router.navigate(['/employees']);
  }
}
