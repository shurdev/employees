import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsDetailViewComponent } from './detail-view/departments.detail-view.component';
import { RouterModule } from '@angular/router';
import { DepartmentsComponent } from './list-view/departments.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DepartmentsComponent, DepartmentsDetailViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DepartmentsComponent
      },
      {
        path: 'new',
        component: DepartmentsDetailViewComponent
      },
      {
        path: ':id',
        component: DepartmentsDetailViewComponent
      }
    ])
  ]
})
export class DepartmentsModule { }
