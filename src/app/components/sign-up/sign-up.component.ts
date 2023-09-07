import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  registerForm!: FormGroup;
  submitted = false;
  isErrorMsg!: boolean;
  userError!: string;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    const passwordregex = /^(?=[a-zA-Z0-9#@$?]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/;
    const usernameregex = /^[a-zA-Z0-9\-_]{0,20}$/;


    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(usernameregex)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(passwordregex)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    this.user = this.registerForm.value;
    if (this.registerForm.invalid) {
      return;
    }
    // this.user.createdBy = "sagar";
    if (this.registerForm.valid) {
      this.userService.register(this.user).subscribe(data => {
         
          console.log(data);
          alert(data.message);
          this.registerForm.reset();
          this.router.navigate(["/"]);
  
          // this.isErrorMsg = true;
          // this.userError = data.message;
          // setInterval(() => {
          //   this.isErrorMsg = false;
          // }, 6000);

      }, (err) => {
        console.log(err);
      });
      // console.log(this.user);
    }
  }
}
