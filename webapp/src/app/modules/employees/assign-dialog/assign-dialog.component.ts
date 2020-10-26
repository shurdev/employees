import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { Department } from 'src/app/shared/models/department.model';
import {map, startWith} from 'rxjs/operators';
import { Employee } from 'src/app/shared/models/employee.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiEmployeeService } from 'src/app/core/http/api-employee.service';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss']
})
export class AssignDialogComponent extends BaseComponent implements OnInit{
  assignDepartmentFormControl = new FormControl();
  filteredOptions: Observable<Department[]>;
  options: Department[];

  constructor(private apiDepartmentService: ApiDepartmentService,
              private apiEmployeeService: ApiEmployeeService,
              public dialogo: MatDialogRef<AssignDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public employee: Employee) {
      super();
   }

  ngOnInit(): void {
    this.addSubscription(
      this.apiDepartmentService.getDepartments().subscribe(
      data => this.options = data
    ));

    this.filteredOptions = this.assignDepartmentFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  private _filter(value: string): Department[] {
    if (value){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.options;
    }
  }

  submit() {
    this.employee.department = this.assignDepartmentFormControl.value._id;
    if (this.assignDepartmentFormControl.value  && this.assignDepartmentFormControl.value._id) {
      this.apiEmployeeService.postEmployees(this.employee).subscribe(
        data => console.log(data)
      );
    }
  }

  displayOption(option) {
    return option ? option.name : undefined;
  }
}
