import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from "src/app/authentication/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vehicle-management-system';
  isLoggedIn$: Observable<boolean>;
  constructor( private authService: AuthService) {}

  ngOnInit() {
    // this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}





