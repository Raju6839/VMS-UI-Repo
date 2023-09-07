import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  

  constructor(private http: HttpClient) { }

  url = "http://localhost:8085/vehicle-management/vehicle";
  baseUrl = "http://localhost:8085/vehicle-management/"
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  createVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(this.url + "/add", vehicle).pipe(catchError(this.handleError));
  }

  getVehicleList(): Observable<any> {
    return this.http.get(`${this.url}`).pipe(catchError(this.handleError));
  }

  getVehicleById(id: number):Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }

  updateVehicle(vehicle: Vehicle  ):Observable<any> {
    return this.http.put(this.url + "/update" , vehicle).pipe(catchError(this.handleError));
  }

  deleteVehicle(id:number):Observable<any> {
    return this.http.delete(`${this.url}/${id}` ).pipe(catchError(this.handleError));
  }

  getPagableVehicleMaster(pageNumber:number,pageSize:number):Observable<any>{
    const url = this.url + "/getAllPagination?page="+pageNumber+"&size="+pageSize;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  searchVehicleMaster(id:string,pageNumber:number,pageSize:number):Observable<any>{
    console.log(id);
    var url = this.url + "/getPageByPlateNumber/" + id + "?page=" +pageNumber+ "&size=" +pageSize
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  searchUserTableData(plateNumber: String,pageNumber:number,pageSize:number): Observable<any> {
    const url = this.baseUrl + "vehicle/vehiclePlateNumber/"+plateNumber+"?pageNum="+pageNumber+"&pageSize="+pageSize;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error:any) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
