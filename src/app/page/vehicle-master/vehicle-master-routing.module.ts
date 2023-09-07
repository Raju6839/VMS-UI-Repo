import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleMasterComponent } from './vehicle-master.component';

const routes: Routes = [
  { path: "", component: VehicleMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleMasterRoutingModule { }
