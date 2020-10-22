import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesDetailViewComponent } from './detail-view/employees.detail-view.component';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './list-view/employees.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EmployeesComponent, EmployeesDetailViewComponent],
  imports: [
    CommonModule,
    SharedModule,
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
  ]
})
export class EmployeesModule { }
