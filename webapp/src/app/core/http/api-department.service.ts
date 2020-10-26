import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from './http.module';
import { environment } from 'src/environments/environment';
import { Department } from 'src/app/shared/models/department.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpModule
})
export class ApiDepartmentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * constructor
   */
  constructor(
    private http: HttpClient,
  ) { }

  getDepartments(): Observable<any> {
    return this.http.get<any[]>(`${environment.api}/departments`, this.httpOptions);
  }

  getDepartmentById(id: string) {
    return this.http.get<any[]>(`${environment.api}/departments/${id}`, this.httpOptions);
  }

  postDepartments(data: Department) {
    if (!data._id) {
      return this.http.post<Department>(`${environment.api}/departments`, data, this.httpOptions);
    } else {
      return this.http.patch<Department>(`${environment.api}/departments`, data, this.httpOptions);
    }
  }

  deleteDepartment(id: string) {
    return this.http.delete<Department>(`${environment.api}/departments/${id}`, this.httpOptions);
  }
}
