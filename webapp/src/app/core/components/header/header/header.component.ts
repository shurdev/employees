import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  reason = '';
  buttonClass = '';

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
    // this.sidenav.open();
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
    this.buttonClass = $event.type === 'mouseover' ? 'animacionVer' : null;
  }

}
