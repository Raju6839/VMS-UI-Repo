import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
declare var $:any;

@Component({
  selector: 'app-full-nav-bar',
  templateUrl: './full-nav-bar.component.html',
  styleUrls: ['./full-nav-bar.component.scss']
})
export class FullNavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    $(document).ready(function () {
      var trigger = $('.hamburger'),
          overlay = $('.overlay'),
         isClosed = false;
    
        trigger.click(function () {
          hamburger_cross();      
        });
    
        function hamburger_cross() {
    
          if (isClosed == true) {          
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
          } else {   
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
          }
      }
      
      $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
      });  
    });
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate([""]);
   }
}
