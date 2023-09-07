import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  id!:number;
  
  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router) { 
    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);

    this.vehicleService.getVehicleById(id).subscribe(data => {
      this.vehicle = data.vehicle;
      console.log(this.vehicle);
      console.log(data);
    });
  }

  onSubmit() {
    // this.vehicle = this.vehicleForm.value;
    this.vehicleService.updateVehicle(this.vehicle).subscribe(data => {
      console.log(data);
      alert("Updated Successfully");
      this.router.navigate(["vehicle-list"]);
    }, err => {
      alert("Vehicle Id Does Not Exists");
    })
  }


}
