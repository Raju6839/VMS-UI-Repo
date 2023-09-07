import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //   $(document).ready(function () {
  //     $('#sidebarCollapse').on('click', function () {
  //         $('#sidebar').toggleClass('active');
  //     });
  // });
  // }

  //  $('#masterPages').hide();
  //  $('#truckTagMappingPage').hide();
  //  $('#truckDiverMappingPage').hide();
  //  $('#weighBridgePage').hide();
  //  $('#dashboardPage').hide();
  //  $('#reportPage').hide();

  }

   openNav() {
    // this.roleBaseValidation();
    // document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("mySidenav").style.width = "17em";
    // document.getElementById("openNav").style.display="none";
    // document.getElementById("main").hidden=true;
    // document.getElementById("appNavbar").hidden=true;
  }


closeNav() {
    // document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").style.width = "0";
  }


dropDown() {
  
}


ngAfterContentInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  
    this.dropDown();
   // this.roleBaseValidation();
  }





  
}

