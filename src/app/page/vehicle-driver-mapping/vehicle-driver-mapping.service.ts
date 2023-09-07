import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VehicleDriverMappingDto } from 'src/app/models/vehicle-driver-mapping-dto';

@Injectable({
  providedIn: 'root'
})
export class VehicleDriverMappingService {
  baseUrl = "http://localhost:8085/vehicle-management/";
  constructor(private http: HttpClient) { }

  vehicleDriverMapping(VehicleDriverMappingDto:any): Observable<any> {
    const url = this.baseUrl+"VehicleDriverMapping/mapVehicleDriver";
    return this.http.post<any>(url,VehicleDriverMappingDto)
      .pipe(catchError(this.handleError));
  }

  getPagableVehicleDriverMapping(pageNumber: number, pageSize: number, sort: string): Observable<any> {
    const url = this.baseUrl + "VehicleDriverMapping/getAllPagination?page=" + pageNumber + "&size=" + pageSize + "&dir=" + sort;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  deleteVehicleDriverMapping(id: number): Observable<any> {
    const url = this.baseUrl + "VehicleDriverMapping/" + id;
    return this.http.delete<any>(url)
    .pipe(catchError(this.handleError));
  }

  editVehicleDriverMappingTableData(tableData: VehicleDriverMappingDto): Observable<any> {
    const url = this.baseUrl + "VehicleDriverMapping"
    return this.http.put<any>(url, tableData).pipe(catchError(this.handleError));
  }

  updateConfirmVehicleDriverMappingTableData(tableData: VehicleDriverMappingDto): Observable<any> {
    const url = this.baseUrl + "VehicleDriverMapping/updateMapVehicleDriver"
    return this.http.put<any>(url, tableData).pipe(catchError(this.handleError));
  }
  
   addConfirmVehicleDriverMappingTableData(tableData: VehicleDriverMappingDto): Observable<any> {
    const url = this.baseUrl + "VehicleDriverMapping/addMapVehicleDriver"
    return this.http.post<any>(url, tableData).pipe(catchError(this.handleError));
  }

  SearchBasedOnDateAndFirstNameAndVehicleNumber(date:string,firstname:string,pageNumber:number,pageSize:number,plateNumber:string):Observable<any>{
    const url = this.baseUrl +"VehicleDriverMapping/findByVehicleNoOrFirstName/"+date+"?"+"plateNumber="+plateNumber+"&"+"page="+pageNumber+"&size="+pageSize+"&firstname="+firstname;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }







  private handleError(error: any) {
    let errorMessage = "";
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
