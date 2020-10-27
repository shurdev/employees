import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesDetailViewComponent } from './detail-view/employees.detail-view.component';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './list-view/employees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignDialogComponent } from './assign-dialog/assign-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';



@NgModule({
  declarations: [EmployeesComponent, EmployeesDetailViewComponent, AssignDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeesComponent
      },
      {
        path: 'new',
        component: EmployeesDetailViewComponent
      },
      {
        path: ':id',
        component: EmployeesDetailViewComponent
      }
    ])
  ],
  entryComponents: [AssignDialogComponent]
})
export class EmployeesModule { }
