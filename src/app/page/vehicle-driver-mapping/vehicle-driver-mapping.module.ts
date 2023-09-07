import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDriverMappingRoutingModule } from './vehicle-driver-mapping-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VehicleDriverMappingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule
  ]
})
export class VehicleDriverMappingModule { }
