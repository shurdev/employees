import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiEmployeeService } from 'src/app/core/http/api-employee.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/material/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-detail-view',
  templateUrl: './employees.detail-view.component.html',
  styleUrls: ['./employees.detail-view.component.scss']
})
export class EmployeesDetailViewComponent extends BaseComponent implements OnInit {

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    // body: new FormControl('', [Validators.required]),
  });

  disabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private apiEmployeeService: ApiEmployeeService,
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
              this.form.reset(data);
            });
          }
        }
      )
    );
  }

  submit(employee?) {
    this.apiEmployeeService.postEmployees(employee).subscribe(
      () => {
        this.openSnackBar('Empleado Creado');
        this.return();
      }
    );
  }

  return() {
    this.router.navigate(['/employees']);
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
            () => this.return()
          );
        }
      }
    );
  }

  delete(employee) {
    this.apiEmployeeService.deleteEmployee(employee._id).subscribe(
      () => {
        this.openSnackBar('Empleado Borrado');
        this.return();
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar']
    });
  }
}
