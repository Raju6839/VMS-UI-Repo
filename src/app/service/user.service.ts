import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8085/vehicle-management/users";

    register(user: User): Observable<any> {
      return this.http.post<any>(this.url + "/add" , user).pipe(catchError(this.handleError));
    }

    loginUser(username: string, password: string):Observable<any> {
      return this.http.get<any>(this.url + `/validate/${username}/${password}`).pipe(catchError(this.handleError));
    }

    private handleError(error:any) {
      let errorMessage = '';
      errorMessage = `Error: ${error.error.message}`;
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}
