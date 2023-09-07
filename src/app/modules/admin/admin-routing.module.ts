import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   children: [
  //     { path: 'add-vehicle', component: AddVehicleComponent },
  //     { path: 'add-driver', component: AddDriverComponent },
  //     { path: 'driver-list', component: DriverListComponent },
  //     { path: 'vehicle-list', component: VehicleListComponent },
  //     { path: 'home', component: HomeComponent },
  //     { path: 'vehicle', component: VehicleMasterComponent },
  //     { path: '', redirectTo: '/admin/home', pathMatch: 'full' }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
