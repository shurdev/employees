import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from './core/components/guards/can-activate.guard';


const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule)
  // },
  {
    path: 'employees',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'departments',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./modules/departments/departments.module').then(m => m.DepartmentsModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  { path: '**', pathMatch: 'full', redirectTo: 'employees' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard]
})

export class AppRoutingModule { }
