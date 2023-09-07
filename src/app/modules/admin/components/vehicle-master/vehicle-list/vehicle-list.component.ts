import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  searchText!: string;
  vehicles!: Vehicle[];
  id!: number;
  totalLength: any;
  page: number = 1;
  vehicle: Vehicle = new Vehicle();
  vehicleForm!: FormGroup;
  submitted = false;

  constructor(private vehicleService: VehicleService, private router: Router, private fb: FormBuilder) { 
    const plateNumberRegex = "^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$";
    const nameRegex = "[a-zA-Z][a-zA-Z ]+";
    this.vehicleForm = this.fb.group({
      plateNumber: ['', [Validators.required,Validators.pattern(plateNumberRegex)]],
      ownerName: ['', [Validators.required, Validators.pattern(nameRegex)]],
      vehicleType: ['', Validators.required],
      color: ['', [Validators.required, Validators.pattern(nameRegex)]],
      model: ['', [Validators.required, Validators.pattern(nameRegex)]]
    });
  }

  ngOnInit(): void {
    this.vehicleList();
  }
  

  vehicleList() {
    this.vehicleService.getVehicleList().subscribe(data => {
      this.vehicles = data;
      console.log(data);
    })
  }

  deleteVehicle(id: number) {
    if (confirm("Do you want to delete this data ?")) {
    this.vehicleService.deleteVehicle(id).subscribe(data => {
      console.log(data);
      this.vehicleList();
    })
  }
}

get f() {
  return this.vehicleForm.controls;
}

onSubmit() {
  this.submitted = true;
  if (this.vehicleForm.invalid) {
    return;
  }
  this.vehicle = this.vehicleForm.value;
  this.vehicleService.createVehicle(this.vehicle).subscribe(data => {
      console.log(data);
      alert("Vehicle added successfully");
      this.vehicleForm.reset();
      this.router.navigate(["./vehicle-list"]);
  }, (err) => {
    alert("Something went wrong");
  });
}
}
