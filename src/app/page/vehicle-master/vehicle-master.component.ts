import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/models/config';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss']
})
export class VehicleMasterComponent implements OnInit {
  showNav: boolean = true;
  vehicle: Vehicle = new Vehicle();
  vehicleForm!: FormGroup;
  submitted = false;
  // searchText!: string;
  vehicles!: Vehicle[];
  id!: number;
  totalLength: any;
  page: number = 1;
  showAdd!: boolean;
  showUpdate!: boolean;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageIndexes: Array<number> = [];
  currentSelectedPage: number = 0;
  config: Config = new Config();
  selectedValue: number = 4;
  searchUserId!: string;
  searchMode: boolean = false;
  // count = 0;
  // pageSize = 3;
  // pageSizes = [3, 6, 9];

  // vehicle: Vehicle = new Vehicle();
  // vehicleForm!: FormGroup;
  // submitted = false;
  
  constructor(private vehicleService: VehicleService, private router: Router, private fb: FormBuilder) { 
    const plateNumberRegex = "^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$";
    const nameRegex = "[a-zA-Z][a-zA-Z ]+";
    this.vehicleForm = this.fb.group({
      id: [''],
      plateNumber: ['', [Validators.required,Validators.pattern(plateNumberRegex)]],
      ownerName: ['', [Validators.required, Validators.pattern(nameRegex)]],
      vehicleType: ['', Validators.required],
      color: ['', [Validators.required, Validators.pattern(nameRegex)]],
      model: ['', [Validators.required, Validators.pattern(nameRegex)]]
    });
  }

  ngOnInit(): void {
    this.vehicleList();
    this.getPage(0, this.selectedValue);
  }

  

  // handlePageChange(event: any) {
  //   this.page = event;
  //   this.retrieveTutorials();
  // }

  // handlePageSizeChange(event: any) {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.retrieveTutorials();
  // }

  // getRequestParams(page: any, pageSize: any){
  //   const params: {[key:string]: any} = {};

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }

  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }

  //   return params;
  // }

  // retrieveTutorials(): void {
  //   const params = this.getRequestParams(this.page, this.pageSize);

  //   this.vehicleService.getPagableVehicleMaster(params)
  //     .subscribe(
  //       data => {
  //         const { totalItems } = data;   
  //         this.count = totalItems;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
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
        console.log("pageIndexes"+ this.pageIndexes);
        this.currentSelectedPage = data.number;
        console.log(data.number)
        console.log(data.number);
        this.config.id = "vehiclePaginator";
        this.config.currentPage = this.currentSelectedPage + 1;
        this.config.itemsPerPage = this.selectedValue;
        this.config.totalItems = this.totalRecords;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageChanged(event: number) {
    console.log(event)
    this.config.currentPage = event;
    let currentPageValue = this.config.currentPage;
    if (this.searchMode) {
      this.getSearch(this.searchUserId, currentPageValue - 1, this.selectedValue);
    }
    else {
      this.getPage(currentPageValue - 1, this.selectedValue);
    }
  }

  getSearch(id: string, page: number, size: number) {
    this.vehicleService.searchVehicleMaster(id, page, size).subscribe(message => {
     
        console.log(message);
        this.vehicles = message.content;
        this.totalPages = message.totalPages;
        this.totalRecords = message.totalElements;
       this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
        this.currentSelectedPage = message.number;
        this.config.id="vehiclePaginator";
        this.config.currentPage = this.currentSelectedPage + 1;
        this.config.itemsPerPage = this.selectedValue;
        this.config.totalItems = this.totalRecords;

    })
  }

  getPaginationWithIndex(index: number) {
    if (this.searchMode) {
      this.getSearch(this.searchUserId,index, this.selectedValue)
    }
    else {
      this.getPage(index, this.selectedValue);
    }
  }

  onInputClearText(item: any) {
    console.log("input" + item.value.length);
    if (item.value.length == 0) {
      this.searchMode = false;
      this.getPage(0, this.selectedValue);
      console.log("call");
    }
  }

  onSearch(item: any) {
    this.searchMode = true;
    this.searchUserId = item.value;
    console.log(this.selectedValue);
    this.getSearch(this.searchUserId, 0, this.selectedValue);  
  }
  setActive(index: any) {
    console.log("index :" + index);
    this.pageIndexes = index + 1;
  }

  dropDownRecords(selectedOptionValue: number) {
    if (selectedOptionValue != 3) {
      this.selectedValue = selectedOptionValue;
    }
    else {
      this.selectedValue = 3;
    }
    if (this.searchMode) {
      this.getSearch(this.searchUserId, 0, this.selectedValue);
    }
    else {
      this.getPage(0, this.selectedValue);
    }
  }
  
  get f() {
    return this.vehicleForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this.vehicle = this.vehicleForm.value;
    this.vehicleService.createVehicle(this.vehicle).subscribe(data => {
        console.log(data);
        this.getPage(this.currentSelectedPage, this.selectedValue);
        alert("Vehicle added successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.vehicleForm.reset();
        this.vehicleList();
        
    }, (err) => {
      alert("Something went wrong");
    });
  }

  clickAddVehicle() {
    this.vehicleForm.reset();
    this.showAdd = true;
    this.showUpdate = false; 
  }

  onEdit(row: Vehicle) {
    this.showAdd = false;
    this.showUpdate = true;
    this.vehicleForm.controls['id'].setValue(row.id);
    this.vehicleForm.controls['plateNumber'].setValue(row.plateNumber);
    this.vehicleForm.controls['vehicleType'].setValue(row.vehicleType);
    this.vehicleForm.controls['ownerName'].setValue(row.ownerName);
    this.vehicleForm.controls['model'].setValue(row.model);
    this.vehicleForm.controls['color'].setValue(row.color);
  }

  onUpdate() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this.vehicle.id = this.vehicleForm.value.id;
    this.vehicle.plateNumber = this.vehicleForm.value.plateNumber;
    this.vehicle.ownerName = this.vehicleForm.value.ownerName;
    this.vehicle.vehicleType = this.vehicleForm.value.vehicleType;
    this.vehicle.model = this.vehicleForm.value.model;
    this.vehicle.color = this.vehicleForm.value.color;
    
    console.log(this.vehicle);
    this.vehicleService.updateVehicle(this.vehicle).subscribe(data => {
      console.log(data);
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.vehicleForm.reset();
      this.vehicleList();
    }, err => {
      alert("Vehicle Id Does Not Exists");
    })
  }

  vehicleList() {
    this.vehicleService.getVehicleList().subscribe(data => {
      this.vehicles = data;
      console.log(data);
    })
  }

  deleteVehicle(id: number) {
    if (confirm("Do you want to delete this data ?")) {
    this.vehicleService.deleteVehicle(id).subscribe(data => {
      console.log(data);
      alert("Successfully Deleted");
      if (!this.searchMode) {
        this.getPage(this.currentSelectedPage, this.selectedValue);
      } else {
        if (this.searchMode) {
          this.getSearch(this.searchUserId, this.currentSelectedPage, this.selectedValue);
        }
      }
      this.vehicleList();
    })
  }
  
}

// get f() {
//   return this.vehicleForm.controls;
// }

// onSubmit() {
//   this.submitted = true;
//   if (this.vehicleForm.invalid) {
//     return;
//   }
//   this.vehicle = this.vehicleForm.value;
//   this.vehicleService.createVehicle(this.vehicle).subscribe(data => {
//       console.log(data);
//       alert("Vehicle added successfully");
//       this.vehicleForm.reset();
//       this.router.navigate(["./vehicle-list"]);
//   }, (err) => {
//     alert("Something went wrong");
//   });
// }


}
