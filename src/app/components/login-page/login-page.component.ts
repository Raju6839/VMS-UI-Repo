import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  userError!: string;
  isErrorMsg!: boolean;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(["home"]);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    if (this.loginForm.valid) {
      this.userService.loginUser(username, password).subscribe(data => {
        if (data.status === 'OK') {
          this.authService.login(this.loginForm.value);
          console.log(data);
          // this.authService.userFrom = this.loginForm.value;
          alert(data.message);
          this.loginForm.reset();
          this.router.navigate(['home']);
        } else {
          this.isErrorMsg = true;
          this.userError = data.message;
          setInterval(() => {
            this.isErrorMsg = false;
          }, 6000);
          // alert(data.message);
        }

      }, (err) => {
        console.log(err);
      });
    }
  }
}
