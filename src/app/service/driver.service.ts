import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8085/vehicle-management/driver";
  baseUrl = "http://localhost:8085/vehicle-management/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addDriver(driver: Driver): Observable<any> {
    return this.http.post<any>(this.url + "/add", driver).pipe(catchError(this.handleError));
  }

  getDriverList(): Observable<any> {
    return this.http.get<any>(`${this.url}`).pipe(catchError(this.handleError));
  }

  getDriverById(id: number):Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }

  updateDriver(driver: Driver ):Observable<any> {
    return this.http.put(this.url + "/update", driver).pipe(catchError(this.handleError));
  }

  deleteDriver(id:number):Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }

  getPagableDriverMaster(pageNumber:number,pageSize:number):Observable<any>{
    const url = this.url + "/getAllPagination?page="+pageNumber+"&size="+pageSize;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }
  searchDriverMaster(id:string,pageNumber:number,pageSize:number):Observable<any>{
    console.log(id);
    var url = this.url + "/getPageByFirstName/" + id + "?page=" +pageNumber+ "&size=" +pageSize
   // http://10.66.66.100:9080/wba-data-service/users/findPageByUserIdOrRoleId?pageNum=0&pageSize=1&roleId=1
    return this.http.get<any>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  SearchBasedOnlicenseAndName(license:string,firstname:string,pageNumber:number,pageSize:number):Observable<any>{
    const url = this.baseUrl + "driver/findPageByNameOrLicense?licenseNumber="+license+"&firstname="+firstname+"&page="+pageNumber+"&size="+pageSize;
    //return this.http.post(url,tableData)UserMasterResponse
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }
  SearchBasedOnlicense(license:string,pageNumber:number,pageSize:number):Observable<any>{
    const url = this.baseUrl + "driver/findPageByNameOrLicense?licenseNumber="+license+"&page="+pageNumber+"&size="+pageSize;
    //return this.http.post(url,tableData)UserMasterResponse
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }
  SearchBasedOnDriverName(firstname:string,pageNumber:number,pageSize:number):Observable<any>{
    const url = this.baseUrl + "driver/findPageByNameOrLicense"+"?firstname="+firstname+"&page="+pageNumber+"&size="+pageSize;
    //return this.http.post(url,tableData)UserMasterResponse
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }


  private handleError(error:any) {
    let errorMessage = '';
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
