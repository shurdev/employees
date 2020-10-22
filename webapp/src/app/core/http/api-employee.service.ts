import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from './http.module';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/shared/models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpModule
})
export class ApiEmployeeService {

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

  getEmployees(): Observable<any> {
    return this.http.get<any[]>(`${environment.api}/employees`, this.httpOptions);
  }

  getEmployeeById(id: string) {
    return this.http.get<any[]>(`${environment.api}/employees/${id}`, this.httpOptions);
  }

  postEmployees(data: Employee) {
    if (!data._id) {
      return this.http.post<Employee>(`${environment.api}/employees`, data, this.httpOptions);
    } else {
      return this.http.patch<Employee>(`${environment.api}/employees`, data, this.httpOptions);
    }
  }
  deleteEmployee(id: string) {
    return this.http.delete<Employee>(`${environment.api}/employees/${id}`, this.httpOptions);
  }
}
