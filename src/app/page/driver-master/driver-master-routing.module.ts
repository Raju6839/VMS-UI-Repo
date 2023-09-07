import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverMasterComponent } from './driver-master.component';

const routes: Routes = [
  { path: "", component: DriverMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverMasterRoutingModule { }
