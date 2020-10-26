import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { BaseComponent } from './shared/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Gestión de Usuarios';
  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
  }
}
