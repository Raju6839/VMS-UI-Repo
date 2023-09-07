import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/models/config';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicle-number-search-table',
  templateUrl: './vehicle-number-search-table.component.html',
  styleUrls: ['./vehicle-number-search-table.component.scss']
})
export class VehicleNumberSearchTableComponent implements OnInit {
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  vehicles: any[] = [];
  pageIndexes: Array<number> = [];
  userDto: any[] = [];
  selectedValue: number = 5;
  // searchLogo;
  txt: string;
  searchVehicleRegistrationNumber: string;
  editIndexId: number;
  totalRecords: number = 0;
  id: number;
  pageSize: number = 3;
  searchMode: boolean = false;
  @Output() callVehicleDriverMappingPage = new EventEmitter();
  config: Config = new Config();
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getPage(0, this.selectedValue);
  }

  onInputClearText(item: any) {
    console.log("input" + item.value.length);
    if (item.value.length == 0) {
      this.searchMode = false;
      this.getPage(0, this.selectedValue);
    };

  }

  // getPage(page: number,size:number){
  //   this.vehicleService.getPagableVehicleMaster(page,size).subscribe( message => {
  //                 console.log(message);
  //                 this.vehicles = message.content;
  //                 this.totalPages = message.totalPages;
  //                 this.totalRecords=message.totalElements;
  //                 console.log(message.totalElements);
  //                 this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
  //                 this.currentSelectedPage = message.number;
  //                 console.log(message.number);
  //                 this.setConfigData();
  //               },
  //               (error) => {
  //                 console.log(error);
  //               }
  //           );
  // }

  getPage(page: number, size: number) {
    this.vehicleService.getPagableVehicleMaster(page, size).subscribe(
      data => {
        // console.log("Vehicles", + data);
        this.vehicles = data.content;
        console.log(data.content);
        this.totalPages = data.totalPages;
        this.totalRecords = data.totalElements;
        console.log(data.totalElements);
        this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
        console.log("pageIndexes" + this.pageIndexes);
        this.currentSelectedPage = data.number;
        console.log(data.number)
        this.setConfigData();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  onSearch(item: any) {
    this.searchVehicleRegistrationNumber = item.value;
    if (item.value === null || item.value === '') {
      this.getPage(0, this.selectedValue);
      this.searchMode = false;
    }
    else {
      this.getSearch(this.searchVehicleRegistrationNumber, 0, this.selectedValue);
      this.searchMode = true;
    }
  }

  // getSearch(plateNumber:String,page:number,size:number){
  //   this.vehicleService.searchUserTableData(plateNumber,page,size).subscribe(message => {
  //     if (message.status === "OK") {
  //       console.log(message);
  //       this.vehicles = message.content;
  //       this.totalPages = message.totalPages;
  //       this.totalRecords=message.totalElements;
  //       console.log(message.totalElements);
  //       this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
  //       this.currentSelectedPage = message.number;
  //       console.log(message.number);
  //       this.setConfigData();
  //     }
  //   })
  // }


  getSearch(id: string, page: number, size: number) {
    this.vehicleService.searchVehicleMaster(id, page, size).subscribe(message => {
      console.log(message);
      this.vehicles = message.content;
      this.totalPages = message.totalPages;
      this.totalRecords = message.totalElements;
      this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
      this.currentSelectedPage = message.number;
      this.setConfigData();
    })
  }

  setConfigData() {
    this.config = {
      id: "truckNumberPaginator",
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
    this.config.currentPage = event;
    let currentPageValue = this.config.currentPage;
    if (this.searchMode) {
      this.getSearch(this.searchVehicleRegistrationNumber, currentPageValue - 1, this.selectedValue);
    }
    else {
      this.getPage(currentPageValue - 1, this.selectedValue);
    }
  }

  getPaginationWithIndex(index: number) {
    this.getPage(index, this.selectedValue);
  }

  onSetInputValue(selectedRowValue: string) {
    this.callVehicleDriverMappingPage.emit(selectedRowValue)
  }

}
