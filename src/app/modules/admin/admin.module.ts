import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddVehicleComponent } from './components/vehicle-master/add-vehicle/add-vehicle.component';
import { VehicleListComponent } from './components/vehicle-master/vehicle-list/vehicle-list.component';
import { AddDriverComponent } from './components/driver-master/add-driver/add-driver.component';
import { DriverListComponent } from './components/driver-master/driver-list/driver-list.component';
import { UpdateDriverComponent } from './components/driver-master/update-driver/update-driver.component';
import { UpdateVehicleComponent } from './components/vehicle-master/update-vehicle/update-vehicle.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AddVehicleComponent,
    VehicleListComponent,
    AddDriverComponent,
    DriverListComponent,
    UpdateDriverComponent,
    UpdateVehicleComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class AdminModule { }
