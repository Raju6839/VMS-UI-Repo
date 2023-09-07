import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/models/config';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-driver-license-search-table',
  templateUrl: './driver-license-search-table.component.html',
  styleUrls: ['./driver-license-search-table.component.scss']
})
export class DriverLicenseSearchTableComponent implements OnInit {
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  drivers: any[] = [];
  pageIndexes: Array<number> = [];
  userDto: any[] = [];
  selectedValue: number = 5;
  totalRecords: number = 0;
  searchMode: boolean = false;
  searchDriver: string;
  searchLicense: string;
  @Output() callVehicleDriverMappingPage = new EventEmitter();
  config: Config = new Config();
  searchUserId: string;
  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.getPage(0, this.selectedValue);
  }

  onInputClearText(item: any) {
    console.log("input" + item.value.length);
    if (item.value.length == 0) {
      this.searchMode = false;
      this.getPage(0, this.selectedValue);
      console.log("call");
    }
  }
  getPage(page: number, size: number) {
    this.driverService.getPagableDriverMaster(page, size).subscribe(message => {
      console.log(message);
      this.drivers = message.content;
      console.log(message.content);
      this.totalPages = message.totalPages;
      this.totalRecords = message.totalElements;
      console.log(message.totalElements);
      this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
      this.currentSelectedPage = message.number;
      console.log(message.number);
      this.setConfigData();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  onSetInputValue(selectedRowValue: string) {
    this.callVehicleDriverMappingPage.emit(selectedRowValue);
  }

  onSearch(item: any) {
    this.searchMode = true;
    this.searchUserId = item.value;
    console.log(this.selectedValue);
    this.getSearch(this.searchUserId, 0, this.selectedValue);
  }

  // commomSearchDetails(message:any){
  //   console.log(message);
  //   this.drivers = message.content;
  //   this.totalPages = message.totalPages;
  //   this.totalRecords=message.totalElements;
  //   console.log(message.totalElements);
  //   this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
  //   this.currentSelectedPage = message.number;
  //   console.log(message.number);
  // }

  // getSearch(licenseNumber:string,firstname:string,page:number,size:number){
  //   console.log(" inside getSearch");
  //   if(licenseNumber==="" && firstname!=="" ){
  //     console.log("license: "+licenseNumber);
  //     this.driverService.SearchBasedOnDriverName(firstname,page,size).subscribe(message => {
  //       if (message.status === "FOUND") {
  //         this.commomSearchDetails(message);
  //         this.setConfigData();
  //       }
  //     })
  //   }else if(firstname==="" && licenseNumber!==""){
  //     console.log("license: "+licenseNumber);
  //     this.driverService.SearchBasedOnlicense(licenseNumber,page,size).subscribe(message => {
  //       if (message.status === "FOUND") {
  //         this.commomSearchDetails(message);
  //         this.setConfigData();
  //       }
  //     })
  //   }else{
  //     console.log("else: "+licenseNumber +" "+firstname );
  //     this.driverService.SearchBasedOnlicenseAndName(licenseNumber,firstname,page,size).subscribe(message => {
  //       if (message.status === "FOUND") {
  //         this.commomSearchDetails(message);
  //         this.setConfigData();
  //       }
  //     })
  //   }  
  // }

  getSearch(id: string, page: number, size: number) {
    this.driverService.searchDriverMaster(id, page, size).subscribe(message => {

      console.log(message);
      this.drivers = message.content;
      this.totalPages = message.totalPages;
      this.totalRecords = message.totalElements;
      this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
      this.currentSelectedPage = message.number;
      this.config.id = "driverPaginator";
      this.config.currentPage = this.currentSelectedPage + 1;
      this.config.itemsPerPage = this.selectedValue;
      this.config.totalItems = this.totalRecords;

    })
  }

  setConfigData() {
    this.config = {
      id: "licenseSearchPaginator",
      itemsPerPage: this.selectedValue,
      currentPage: this.currentSelectedPage + 1,
      totalItems: this.totalRecords
    };
  }

  setActive(index: any) {
    console.log("index :" + index);
    this.pageIndexes = index + 1;
  }
  //*******for new pagination *******/ 
  pageChanged(event: number) {
    console.log(event)
    this.config.currentPage = event;
    let currentPageValue = this.config.currentPage;
    console.log(currentPageValue)
    if (this.searchMode) {
      this.getSearch(this.searchUserId, currentPageValue - 1, this.selectedValue);
    }
    else {
      this.getPage(currentPageValue - 1, this.selectedValue);
    }
  }

  getPaginationWithIndex(index: number) {
    if (this.searchMode) {
      this.getSearch(this.searchUserId, index, this.selectedValue)
    }
    else {
      this.getPage(index, this.selectedValue);
    }
  }


}
