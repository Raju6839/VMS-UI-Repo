import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {
  searchText!: string;
  drivers!: Driver[];
  id!: number;
  totalLength: any;
  page: number = 1;

  constructor(private driverService: DriverService, private router: Router) { }

  ngOnInit(): void {
    this.driverList();
  }

  driverList() {
    this.driverService.getDriverList().subscribe(data => {
        this.drivers = data;
        console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

  deleteDriver(id: number) {
    if (confirm("Do you want to delete this data ?")) {
    this.driverService.deleteDriver(id).subscribe(data => {
      console.log(data);
      this.driverList();
    },(err)=> {
      console.log(err);
    })
  }
}



}
