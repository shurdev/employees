import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiDepartmentService } from 'src/app/core/http/api-department.service';
import { Department } from '../../models/department.model';

@Pipe({
  name: 'httptransform',
})
export class HttpTransformPipe implements PipeTransform {

  constructor(private apiDepartment: ApiDepartmentService){}

  transform(value: string, ...args: unknown[]): Observable<string> {
    return this.apiDepartment.getDepartmentById(value)
    .pipe(
      filter(deptm => deptm !== null),
      map(
        department => department.name
      )
    );
  }
}
