import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/shared/models/department.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/material/dialog-confirm/dialog-confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-detail-view',
  templateUrl: './departments.detail-view.component.html',
  styleUrls: ['./departments.detail-view.component.scss']
})
export class DepartmentsDetailViewComponent extends BaseComponent implements OnInit {
  @ViewChild(MatSort, { static: false}) columnSort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.minLength(5)]),
  });

  disabled: boolean;

  constructor(
    private route: ActivatedRoute,
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
        (params: Department) => {
          if (params.id) {
            this.apiDepartmentService.getDepartmentById(params.id).subscribe((data: any) => {
              this.form.reset(data);
            });
          }
        }
      )
    );
  }

  submit(department?) {
    this.apiDepartmentService.postDepartments(department).subscribe(
      () => {
        this.openSnackBar('Departamento Creado', 'Guardar');
        this.return();
      }
    );
  }

  return() {
    this.router.navigate(['/departments']);
  }

  delete(department) {
    this.apiDepartmentService.deleteDepartment(department._id).subscribe(
      () => {
        this.openSnackBar('Departamento Borrada', 'Eliminar');
        this.return();
      }
    );
  }

  showDeleteDialog(department: Department): void {
    this.dialog
      .open(DialogConfirmComponent, {
        data: `¿Está seguro de que desea borrar el empleado ${department.name}?`
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.apiDepartmentService.deleteDepartment(department._id)
          .subscribe(
            () => this.return()
          );
        }
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
}
