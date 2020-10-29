import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid: boolean;
  formSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }


  ngOnInit() {
    this.authService.isCheckIsAuthenticated()
    .subscribe(
      check => {
        if (check){
          this.redirectToHome();
        }
      }
    );

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const pass = this.form.get('password').value;
        const user: User = { name: username , password: pass};

        this.authService.login(user).subscribe(
          () => this.redirectToHome()
        );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }


  redirectToHome() {
    this.router.navigate(['/employees']);
  }
}
