import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import * as $ from 'jquery';
import { SideBarComponent } from './common-nav/side-bar/side-bar.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { NavBarComponent } from './common-nav/nav-bar/nav-bar.component';
import { VehicleMasterComponent } from './page/vehicle-master/vehicle-master.component';
import { DriverMasterComponent } from './page/driver-master/driver-master.component';
import { HomeComponent } from './page/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FullNavBarComponent } from './common-nav/full-nav-bar/full-nav-bar.component';
import { VehicleDriverMappingComponent } from './page/vehicle-driver-mapping/vehicle-driver-mapping.component';
import { VehicleNumberSearchTableComponent } from './common-pagination-table/vehicle-number-search-table/vehicle-number-search-table.component';
import { DriverLicenseSearchTableComponent } from './common-pagination-table/driver-license-search-table/driver-license-search-table.component';
import { DatePipe } from '@angular/common';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ReportComponent } from './page/report/report.component';
import { NgChartsModule } from 'ng2-charts';




// import { AdminModule } from './modules/admin/admin.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent,
    SideBarComponent,
    NavBarComponent,
    VehicleMasterComponent,
    DriverMasterComponent,
    HomeComponent,
    FullNavBarComponent,
    VehicleDriverMappingComponent,
    VehicleNumberSearchTableComponent,
    DriverLicenseSearchTableComponent,
    DashboardComponent,
    ReportComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    Ng2OrderModule,
    NgChartsModule,

    // AdminModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
