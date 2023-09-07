import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleMasterRoutingModule } from './vehicle-master-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { VehicleMasterComponent } from './vehicle-master.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VehicleMasterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class VehicleMasterModule { }
