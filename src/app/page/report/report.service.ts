import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = "http://localhost:8085/vehicle-management/";

  constructor(private http: HttpClient) { }

  SearchBasedOnDateAndFirstNameAndVehicleNumber(date:string, firstname:string,pageNumber:number,pageSize:number,plateNumber:string):Observable<any>{
    const url = this.baseUrl +"VehicleDriverMapping/findByVehicleNoOrFirstName/"+date+"?"+"plateNumber="+plateNumber+"&"+"page="+pageNumber+"&size="+pageSize+"&firstname="+firstname;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  getPagableVehicleDriverMapping(pageNumber: number, pageSize: number, sort: string): Observable<any> {
    const url = this.baseUrl + "VehicleDriverMapping/getAllPagination?page=" + pageNumber + "&size=" + pageSize + "&dir=" + sort;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  SearchBasedOnTransactionDate(fromDate:string,toDate:string,pageNumber:number,pageSize:number):Observable<any>{
    const url = this.baseUrl +"VehicleDriverMapping/findReportTransactionByDate/"+fromDate+"/"+toDate+"?"+"page="+pageNumber+"&size="+pageSize;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = "";
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  

}
