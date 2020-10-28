import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  reason = '';
  buttonClass = '';
  user: Subject<User>;
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.isAuthenticated();
    this.user = this.authService.user;
  }

  goToEmployees() {
    this.router.navigate(['/employees']);
  }

  goToDepartments() {
    this.router.navigate(['/departments']);
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  changeStyle($event){
    this.buttonClass = $event.type === 'mouseover' ? 'showAnimation' : null;
  }

  logOut() {
    this.authService.logOut();
  }
}
