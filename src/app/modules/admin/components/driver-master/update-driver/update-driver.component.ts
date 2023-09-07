import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.scss']
})
export class UpdateDriverComponent implements OnInit {
  driver: Driver = new Driver();
  id!: number;
  constructor(private driverService: DriverService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);

    this.driverService.getDriverById(id).subscribe(data => {
      this.driver = data.driver;
      console.log(this.driver);
      console.log(data);
    });
  }

  onSubmit() {
    this.driverService.updateDriver(this.driver, this.id).subscribe(data => {
      console.log(data);
      alert("Updated Successfully");
      this.router.navigate(["driver-list"]);
    }, err => {
      alert("Driver Id Does Not Exists");
    })
  }


}
