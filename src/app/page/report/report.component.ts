import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Config } from 'src/app/models/config';
import { VehicleDriverMappingDto } from 'src/app/models/vehicle-driver-mapping-dto';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  currentSelectedPages: number = 0;
  totalPages: number = 0;
  vehicledrivers: any[] = [];
  pageIndexes: Array<number> = [];
  selectedValues: number = 5;
  editIndexId: number;
  totalRecord: number = 0;
  id: number;
  transcationNumber: string;
  transactionDate: string;
  event: Event;
  todayDate: string;
  // pageSize: number = 3;
  updating: boolean = false;
  editMode: boolean = false;
  searchMode: boolean = false;
  vehicleDriverMappingDto: VehicleDriverMappingDto = new VehicleDriverMappingDto();
  searchLicense: any;
  searchVehicleNumber: any;
  searchDate: any;
  checkPassed: true;
  previousVal: string;
  curVal: string;
  date = new Date();
  currentDate: any;
  mindate: string;
  transporterName: boolean;
  truckNumber: boolean;
  // licenseNumber: boolean;
  transporterId: number;
  pageSizeCount: number;
  isItTransporterNameIcon: boolean = true;
  pageNo: number;
  config: Config = new Config();
  vehicleDriverMappingPageFormGroup: FormGroup;
  vehicleNumber: boolean;
  licenseNumber: boolean;
  plateNumber: boolean;
  sorting: string="asc";
  fromDate: string;
  toDate: string;
  searchFromDate: any;
  searchToDate: any;
  
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    // this.fromDate = this.getPreviousDate();
    // this.curVal = this.getFutureDate();
    this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
  }

  getPreviousDate(): string {
    let date = new Date();
    return new Date(date.setDate(date.getDate())).toISOString().split('T')[0];
  }

  getFutureDate(): string {
    let date = new Date();
    return new Date(date.setDate(date.getDate())).toISOString().split("T")[0];
  }



  onFromDateSelect($event: any) {
    if (this.checkPassed) {
      this.previousVal = this.fromDate;
      console.log(this.previousVal);
    } else {
      //Reset to previous
      this.fromDate = this.previousVal;
      console.log(this.fromDate);
    }
  }

  onDateSelect($event: any) {
    if (this.checkPassed) {
      this.previousVal = this.curVal;
      console.log("previousVal " + this.previousVal);
    } else {
      //Reset to previous
      this.curVal = this.previousVal;
      console.log("curVal " + this.curVal);
    }
  }



  getPage(pageNumber: number, pageSize: number, sort: string) {
    this.reportService
      .getPagableVehicleDriverMapping(pageNumber, pageSize, sort)
      .subscribe(
        (message) => {
          console.log(message);
          this.vehicledrivers = message.vehicleDriverMappingDto.content;
          console.log(message.vehicleDriverMappingDto.content);
          this.totalPages = message.vehicleDriverMappingDto.totalPages;
          this.totalRecord = message.vehicleDriverMappingDto.totalElements;
          console.log(message.vehicleDriverMappingDto.totalElements);
          this.pageIndexes = Array(this.totalPages)
            .fill(0)
            .map((x, i) => i);
          this.currentSelectedPages = message.vehicleDriverMappingDto.number;
          console.log(message.vehicleDriverMappingDto.number);
          this.setConfigData();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onGetSearch(fromDate: string, toDate: string, pageNumber: number, pageSize: number) {
    console.log(" inside getSearch");
    this.reportService.SearchBasedOnTransactionDate(fromDate,toDate,pageNumber,pageSize).subscribe(message => {
      if (message.status === "FOUND") {
        console.log(message);
        this.vehicledrivers = message.vehicleDriverMappingDto.content;
        this.totalPages = message.vehicleDriverMappingDto.totalPages;
        this.totalRecord = message.vehicleDriverMappingDto.totalElements;
        console.log(message.vehicleDriverMappingDto.totalElements);
        this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
        this.currentSelectedPages = message.vehicleDriverMappingDto.number;
        this.config.id = "vehicleDriverPaginator";
        this.config.currentPage = this.currentSelectedPages + 1;
        this.config.itemsPerPage = this.selectedValues;
        this.config.totalItems = this.totalRecord;
      }
      else if (message.status === "NOT_FOUND") {
        this.vehicledrivers = [];
        this.totalPages = 0;
        this.totalRecord = 0;
        this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
        this.currentSelectedPages = 0;
        this.setConfigData();
        alert(message.message);
      }
    })
  }

  onPageChanged(event: number) {
    this.config.currentPage = event;
    let currentPageValue = this.config.currentPage;
    if (this.searchMode) {
      this.onGetSearch(this.searchFromDate, this.searchToDate , currentPageValue - 1, this.selectedValues);
    }
    else {
      this.getPage(currentPageValue - 1, this.selectedValues, this.sorting);
    }
  }

  getPaginationWithIndex(index: number) {
    if (!this.searchMode) {
      this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
      // this.onGetSearch(this.curVal, this.searchLicense, index, this.selectedValues, this.searchVehicleNumber);
    } else {
      if (this.searchMode) {
        this.onGetSearch(this.searchFromDate, this.searchToDate, index, this.selectedValues);
      }
    }
  }

  onSearch(item1: any, item2: any) {
    this.searchFromDate = item1.value;
    this.searchToDate = item2.value;
    // this.searchLicense = item2.value;
    // this.searchVehicleNumber = item3.value;
    this.searchMode = true;
    console.log(this.searchFromDate);
    console.log(this.searchToDate);
    // console.log(this.searchLicense);
    // console.log(this.searchVehicleNumber);
    this.onGetSearch(this.searchFromDate, this.searchToDate, 0, this.selectedValues);
  }

  onInputClearText(item2: any, item3: any) {
    console.log("input" + item2.value.length + "," + item3.value.length);
    if (item2.value.length == 0 && item3.value.length == 0) {
      this.searchMode = false;
      this.curVal = this.getFutureDate();
      this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
      // this.onGetSearch(this.curVal, this.searchLicense, 0, this.selectedValues, this.searchVehicleNumber);
    }
  }

  setConfigData() {
    this.config.id = "vehicleDriverPaginator";
    this.config.currentPage = this.currentSelectedPages + 1;
    this.config.itemsPerPage = this.selectedValues;
    this.config.totalItems = this.totalRecord;
  }

  onSetActive(indexValue: any) {
    console.log("index :" + indexValue);
    this.pageIndexes = indexValue + 1;
  }

}
