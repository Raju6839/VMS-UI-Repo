import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';





const routes: Routes = [
  // { path: "login", component: LoginPageComponent },
  // { path: "register", component: SignUpComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'vehicle-master', component: VehicleMasterComponent },
  // { path: 'driver-master', component: DriverMasterComponent },
  // {
  //   path: 'admin',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./modules/admin/admin.module').then((m) => m.AdminModule),
  // }

  {
    path: "",
    component: LoginPageComponent
  },
  { path: "sign-up",
   component: SignUpComponent },

  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: ()=> import("src/app/page/home/home.module").then(
      (module)=>module.HomeModule
    ),
  },

  {
    path: "vehicle-master",
    canActivate: [AuthGuard],
    loadChildren: () => import("src/app/page/vehicle-master/vehicle-master.module").then(
      (module) => module.VehicleMasterModule
    ),
  },

  {
    path: "vehicle-driver-mapping",
    canActivate: [AuthGuard],
    loadChildren: () => import("src/app/page/vehicle-driver-mapping/vehicle-driver-mapping.module").then(
      (module) => module.VehicleDriverMappingModule
    ),
  },

  {
    path: "driver-master",
    canActivate: [AuthGuard],
    loadChildren: () => import("src/app/page/driver-master/driver-master.module").then(
      (module) => module.DriverMasterModule
    ),
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () => import("src/app/page/dashboard/dashboard.module").then(
      (module) => module.DashboardModule
    ),
  },
  {
    path: "report",
    canActivate: [AuthGuard],
    loadChildren: () => import("src/app/page/report/report.module").then(
      (module) => module.ReportModule
    ),
  }
  // {
  //   path: '',
  //   component: HomeComponent,
  //   children: [
  //     { path: 'vehicle-master', component: VehicleMasterComponent },
  //     { path: 'driver-master', component: DriverMasterComponent },
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
