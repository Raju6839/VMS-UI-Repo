import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDriverMappingComponent } from './vehicle-driver-mapping.component';

const routes: Routes = [
  { path: "", component: VehicleDriverMappingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDriverMappingRoutingModule { }
