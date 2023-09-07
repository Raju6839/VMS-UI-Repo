import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/authentication/auth.service";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  // isDropDown:boolean = false;

  //  @ViewChild('toggleButton',{static:true}) toggleButton: ElementRef;
  constructor(private route: Router,private renderer: Renderer2, private authService: AuthService) {
  //    this.renderer.listen('window', 'click',(e:Event)=>{
  //       /**
  //        * Only run when toggleButton is not clicked
  //        * If we don't check this, all clicks (even on the toggle button) gets into this
  //        * section which in the result we might never see the menu open!
  //        * And the menu itself is checked here, and it's where we check just outside of
  //        * the menu and button the condition abbove must close the menu
  //        */
  //      if(e.target !== this.toggleButton.nativeElement){
  //          this.isDropDown=false;
  //      }
  //  });
   }

  ngOnInit(): void {
  }

   onLogOut() {
    this.authService.logout();
    this.route.navigate([""]);
   }

  //  onClickDropDown(){
  //   this.isDropDown = !this.isDropDown;
  // }
}
