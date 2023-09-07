import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  driver: Driver = new Driver();
  driverForm!: FormGroup;
  submitted = false;
  constructor(private driverService: DriverService, private router: Router, private fb: FormBuilder) {
    const phoneNumberRegex = "^((\\+91-?)|0)?[0-9]{10}$";
    const nameRegex = "[a-zA-Z][a-zA-Z ]+";
    const licenseNumberRegex = "^[A-Z](?:\d[- ]*){14}$";

    this.driverForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(nameRegex)]],
      lastname: ['', [Validators.required, Validators.pattern(nameRegex)]],
      licenseNumber: ['', [Validators.required, Validators.pattern(licenseNumberRegex)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]]
    });

  }

  ngOnInit(): void {
  }

  get f() {
    return this.driverForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.driverForm.invalid) {
      return;
    }
    this.driver = this.driverForm.value;
    this.driverService.addDriver(this.driver).subscribe(data => {
        console.log(data);
        alert("successfully added");
        this.driverForm.reset();
        this.router.navigate(["driver-list"]);
    }, (err) => {
      alert("Something went wrong");
    });
  }

  

 
}
