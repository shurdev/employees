import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService) {}

  canActivate(){
      if (this.authService.isAuthenticated()) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
  }
}
