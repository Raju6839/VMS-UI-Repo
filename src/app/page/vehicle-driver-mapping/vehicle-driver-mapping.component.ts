import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/models/config';
import { VehicleDriverMappingDto } from 'src/app/models/vehicle-driver-mapping-dto';
import { VehicleDriverMappingService } from './vehicle-driver-mapping.service';
// import $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-vehicle-driver-mapping',
  templateUrl: './vehicle-driver-mapping.component.html',
  styleUrls: ['./vehicle-driver-mapping.component.scss']
})
export class VehicleDriverMappingComponent implements OnInit {
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
  // vehicleDriverMappingPageFormGroup: FormGroup;
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

  constructor(private fb: FormBuilder, private vehicleDriverMappingService: VehicleDriverMappingService, private datePipe: DatePipe) {
    const vehicleNumberRegex = "^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$";
    const licenseNumberRegex = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";


    this.vehicleDriverMappingPageFormGroup = this.fb.group({
      date: [""],
      plateNumber: [""],
      licenseNumber: [""]
    });
  }

  get f() {
    return this.vehicleDriverMappingPageFormGroup.controls;
  }

  ngOnInit(): void {
    // this.futureDateDisable();
    this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
  }

  getTableRowValueFromVehicleNumberCommonPage($event: any) {
    this.f.plateNumber.setValue($event);
    $("#exampleModal").modal("hide");
    this.plateNumber = false;
  }
  getTableRowValueFromDriverLicenceCommonPage($event: any) {
    this.f.licenseNumber.setValue($event);
    $("#exampleModal").modal("hide");
    this.licenseNumber = false;
  }

  onPopScreen(selectedInputTex: number) {
    $("#exampleModal").modal("show");
    if (selectedInputTex == 1) {
      this.plateNumber = true;
      // this.transporterName = false;
      this.licenseNumber = false;
    } else {
      if (selectedInputTex == 2) {
        this.licenseNumber = true;
        this.plateNumber = false;
        // this.transporterName = false;
      }
    }
  }

  commanDataBinding() {
    this.vehicleDriverMappingDto.vehicleMaster.plateNumber =
      this.f.plateNumber.value;
    this.vehicleDriverMappingDto.driverMaster.licenseNumber =
      this.f.licenseNumber.value;
    this.vehicleDriverMappingDto.date = this.f.date.value;
  }

  getFutureDate(): string {
    let date = new Date();
    return new Date(date.setDate(date.getDate())).toISOString().split("T")[0];
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



  // futureDateDisable() {
  //   var date: any =  new Date();
  //   var todayDate:any = date.getDate();
  //   var month:any = date.getMonth() + 1;
  //   var year:any = date.getFullYear() + 1;
  //   if(todayDate < 10) {
  //     todayDate = "0" + todayDate;
  //   }

  //   if(month < 10) {
  //     month = "0" + month;
  //   }
  //   this.maxDate = year + "-" + month + "-" + todayDate;
  //   console.log(this.maxDate);
  // }

  onSubmit() {
    if (this.editMode == true) {
      console.log("update calling");
      this.vehicleDriverMappingDto.id = this.id;
      this.commanDataBinding();
      // this.vehicleDriverMapping.modifiedBy = this.authService.userForm.userName;
      console.log(JSON.stringify(this.vehicleDriverMappingDto));
      this.vehicleDriverMappingService.editVehicleDriverMappingTableData(this.vehicleDriverMappingDto).subscribe(data => {
        if (data.status == "OK") {
          this.editMode = false;
          alert(data.message);
          let frontendData = JSON.stringify(data)
          this.vehicleDriverMappingPageFormGroup.reset();
          console.log(frontendData);
          if (!this.searchMode) {
            this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
            // this.onGetSearch(this.curVal, this.searchLicense, this.currentSelectedPages, this.selectedValues, this.searchVehicleNumber);
          } else {
            if (this.searchMode) {
              this.onGetSearch(this.searchDate, this.searchLicense, this.currentSelectedPages, this.selectedValues, this.searchVehicleNumber);
            }
          }
        } else if (data.status == "ALREADY_REPORTED") {
          this.curVal = this.f.date.value;
          if (confirm(data.message + " " + "Are you sure you want to update ?")) {
            this.vehicleDriverMappingService.updateConfirmVehicleDriverMappingTableData(this.vehicleDriverMappingDto).subscribe((response) => {
              if (response.status == "OK") {
                alert(response.message);
                this.editMode = false;
                this.vehicleDriverMappingPageFormGroup.reset();
                if (!this.searchMode) {
                  this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
                  // this.onGetSearch(this.curVal, this.searchLicense, this.currentSelectedPages, this.selectedValues, this.searchVehicleNumber);
                } else {
                  if (this.searchMode) {
                    this.onGetSearch(this.searchDate, this.searchLicense, this.currentSelectedPages, this.selectedValues, this.searchVehicleNumber);
                  }
                }
              } else {
                alert(response.message);
              }
            });
            console.log("confirm alert call");
          } else {
            this.editMode = false;
            this.vehicleDriverMappingPageFormGroup.reset();
          }
        } else {
          alert(data.message);
        }
      }, (err) => {
        console.log(err)
        this.editMode = false;
        this.vehicleDriverMappingPageFormGroup.reset();
      })
    }
    else {
      this.commanDataBinding();
      this.curVal = this.f.date.value;
      // this.vehicleDriverMapping.createdBy = this.authService.userForm.userName;
      console.log(JSON.stringify(this.vehicleDriverMappingDto));
      this.vehicleDriverMappingService.vehicleDriverMapping(this.vehicleDriverMappingDto).subscribe(data => {
        if (data.status == "OK") {
          let frontendData = JSON.stringify(data);
          console.log(frontendData);
          this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
          alert(data.message);
          this.vehicleDriverMappingPageFormGroup.reset();
        }
        // } else if (data.status == "ALREADY_REPORTED") {
        //   if (confirm(data.message + " " + "Are you sure you want to add ?")) {
        //     this.vehicleDriverMappingService.addConfirmVehicleDriverMappingTableData(this.vehicleDriverMappingDto).subscribe((response) => {
        //       if (response.status == "OK") {
        //         alert(response.message);
        //         this.editMode = false;
        //         this.vehicleDriverMappingPageFormGroup.reset();
        //         this.getPage(this.currentSelectedPages, this.selectedValues);
        //         // this.onGetSearch(this.curVal, this.searchLicense, this.currentSelectedPages, this.selectedValues, this.searchVehicleNumber);
        //       } else {
        //         alert(response.message);
        //       }
        //     });
        //   } else {
        //     this.editMode = false;
        //   }
        else {
          alert(data.message);
        }
      })
    }
  }

  onEditData(indexNumber: number, id: number, dto: VehicleDriverMappingDto) {
    this.editIndexId = indexNumber;
    this.id = id;
    this.vehicleDriverMappingDto = dto;
    // this.transcationNumber = dto.transcationNumber;
    console.log(this.editIndexId);
    console.log(this.id);
    let outputdto = JSON.stringify(dto);
    console.log(outputdto);
    this.editMode = true;
    this.vehicleDriverMappingPageFormGroup.patchValue({
      // transcationNumber: dto.transcationNumber,
      plateNumber: dto.vehicleMaster.plateNumber,
      licenseNumber: dto.driverMaster.licenseNumber,
    });
    this.vehicleDriverMappingPageFormGroup.controls.date.setValue(
      this.datePipe.transform(dto.date, "yyyy-MM-dd")
    );
  }


  onDeleteData(dto: VehicleDriverMappingDto) {
    if (confirm("Do You Want To Delete This Driver ?")) {
      this.vehicleDriverMappingService.deleteVehicleDriverMapping(dto.id).subscribe((response) => {
        if (response.status === "OK") {
          alert(response.message);
          this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
          if (!this.searchMode) {
            this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
          } else {
            if (this.searchMode) {
              this.onGetSearch(this.searchDate, this.searchLicense, this.currentSelectedPages, this.selectedValues, this.searchVehicleNumber);
            }
          }
        } else {
          alert(response.message);
        }
      });
    }
  }

  getPaginationWithIndex(index: number) {
    if (!this.searchMode) {
      this.getPage(this.currentSelectedPages, this.selectedValues, this.sorting);
      // this.onGetSearch(this.curVal, this.searchLicense, index, this.selectedValues, this.searchVehicleNumber);
    } else {
      if (this.searchMode) {
        this.onGetSearch(this.searchDate, this.searchLicense, index, this.selectedValues, this.searchVehicleNumber);
      }
    }
  }

  getPage(pageNumber: number, pageSize: number, sort: string) {
    this.vehicleDriverMappingService
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

  onGetSearch(date: string, firstname: string, pageNumber: number, pageSize: number, plateNumber: string) {
    console.log(" inside getSearch");
    this.vehicleDriverMappingService.SearchBasedOnDateAndFirstNameAndVehicleNumber(date, firstname, pageNumber, pageSize, plateNumber).subscribe(message => {
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



  onSearch(item1: any, item2: any, item3: any) {
    this.searchDate = item1.value;
    this.searchLicense = item2.value;
    this.searchVehicleNumber = item3.value;
    this.searchMode = true;
    console.log(this.searchDate);
    console.log(this.searchLicense);
    console.log(this.searchVehicleNumber);
    this.onGetSearch(this.searchDate, this.searchLicense, 0, this.selectedValues, this.searchVehicleNumber);
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
  //*******for new pagination *******/ 
  onPageChanged(event: number) {
    this.config.currentPage = event;
    let currentPageValue = this.config.currentPage;
    if (this.searchMode) {
      this.onGetSearch(this.searchDate, this.searchLicense, currentPageValue - 1, this.selectedValues, this.searchVehicleNumber);
    }
    else {
      this.getPage(currentPageValue - 1, this.selectedValues, this.sorting);
    }
  }

  onReset() {
    this.editMode = false;
    this.vehicleDriverMappingPageFormGroup.reset();
  }

  sort(key: string) {
      this.getPage(this.currentSelectedPages, this.selectedValues, key );
  }


}

