import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = "http://localhost:8085/vehicle-management/Dashboard";

  constructor(private http: HttpClient) { }

  getCountOfActiveVehicle(): Observable<any> {
    const url = this.baseUrl + "/CountActiveVehicle";
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  getCountOfNonActiveVehicle(): Observable<any> {
    const url = this.baseUrl + "/CountNonActiveVehicle";
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }
  
  getCountOfActiveDriver(): Observable<any> {
    const url = this.baseUrl + "/CountActiveDriver";
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  getCountOfNonActiveDriver(): Observable<any> {
    const url = this.baseUrl + "/CountNonActiveDriver";
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any) {
    let errorMessage = "";
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
