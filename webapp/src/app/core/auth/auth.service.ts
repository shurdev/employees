import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  constructor(
    private router: Router
  ) { }


  isAuthenticated() {
    const localUser: any = JSON.stringify(localStorage.getItem('login'));
    this.user.next(localUser);
    return !localStorage.getItem('login');
  }

  isCheckIsAuthenticated(): Observable<boolean> {
    const response = !localStorage.getItem('login');
    return new BehaviorSubject<boolean>(!response);
  }

  login(user: User): Observable<boolean> {
    localStorage.setItem('login', user.name);
    this.user.next(user);
    return new BehaviorSubject<boolean>(true);
  }

  logOut(){
    localStorage.removeItem('login');
    this.user.next(null);
    this.router.navigateByUrl('login');
  }
}
