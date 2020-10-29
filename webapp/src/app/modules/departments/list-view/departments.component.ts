import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/shared/models/department.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/material/dialog-confirm/dialog-confirm.component';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends BaseComponent  implements OnInit{
  @ViewChild(MatSort, { static: false}) sortData: MatSort;  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  departmentsList;
  buttonClass = null;
  displayedColumns: string[] = ['departmentCode', 'name', 'description', 'createdAt', 'actions'];
  dataSource;
  subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    private apiDepartmentService: ApiDepartmentService,
    public dialog: MatDialog,
    ) {
      super();
     }

  ngOnInit() {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.addSubscription(
      this.apiDepartmentService.getDepartments().subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sortData;
          this.dataSource.paginator = this.paginator;
        }
      )
    );
  }

  changeStyle($event){
    this.buttonClass = $event.type === 'mouseover' ? 'showAnimation' : null;
  }
  openDetail(item?) {
    this.router.navigate(['/departments', item.id]);
  }

  createDepartment(item?) {
    this.router.navigate(['/departments/new']);
  }

  filterList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editDepartment(department: Department) {
    this.router.navigate(['/departments/' + department._id]);
  }

  deleteDepartment(department: Department) {
    this.showDeleteDialog(department);
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
            () => this.initSubscriptions()
          );
        }
      }
    );
  }
}
