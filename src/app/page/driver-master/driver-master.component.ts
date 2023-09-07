import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Config } from 'src/app/models/config';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-driver-master',
  templateUrl: './driver-master.component.html',
  styleUrls: ['./driver-master.component.scss']
})
export class DriverMasterComponent implements OnInit {
  // searchText!: string;
  drivers!: Driver[];
  id!: number;
  totalLength: any;
  page: number = 1;
  driver: Driver = new Driver();
  driverForm!: FormGroup;
  submitted = false;
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



  constructor(private driverService: DriverService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    const phoneNumberRegex = "^((\\+91-?)|0)?[0-9]{10}$";
    const nameRegex = "[a-zA-Z][a-zA-Z ]+";
    const licenseNumberRegex = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";

    this.driverForm = this.fb.group({
      id: [''],
      firstname: ['', [Validators.required, Validators.pattern(nameRegex)]],
      lastname: ['', [Validators.required, Validators.pattern(nameRegex)]],
      licenseNumber: ['', [Validators.required, Validators.pattern(licenseNumberRegex)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]]
    });
  }

  ngOnInit(): void {
    // let id = this.route.snapshot.params['id'];
    // console.log(id);

    // this.driverService.getDriverById(this.id).subscribe(data => {
    //   this.driver = data;
    //   console.log(this.driver);
    //   console.log(data);
    // });
    this.driverList();
    this.getPage(0, this.selectedValue);
  }



  getPage(page: number, size: number) {
    this.driverService.getPagableDriverMaster(page, size).subscribe(
      (message) => {
        console.log("Driver" + message);
        this.drivers = message.content;
        console.log(message.content);
        this.totalPages = message.totalPages;
        this.totalRecords = message.totalElements;
        console.log(message.totalElements);
        this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
        console.log("pageIndexes" + this.pageIndexes);
        this.currentSelectedPage = message.number;
        console.log(message.number);
        // console.log(message.number);
        this.config.id = "driverPaginator";
        this.config.currentPage = this.currentSelectedPage + 1;
        this.config.itemsPerPage = this.selectedValue;
        this.config.totalItems = this.totalRecords;
      },
      (error) => {
        console.log(error);
      }
    );
  }

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

  getPaginationWithIndex(index: number) {
    if (this.searchMode) {
      this.getSearch(this.searchUserId, index, this.selectedValue)
    }
    else {
      this.getPage(index, this.selectedValue);
    }
  }

  pageChanged(event: number) {
    console.log(event)
    this.config.currentPage = event;
    let currentPageValue = this.config.currentPage;
    console.log(currentPageValue)
    if (this.searchMode) {
      console.log("searchUserId" +this.searchUserId);
      this.getSearch(this.searchUserId, currentPageValue - 1, this.selectedValue);
    }
    else {
      console.log("searchUserId" +this.searchUserId);
      this.getPage(currentPageValue - 1, this.selectedValue);
    }
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



  driverList() {
    this.driverService.getDriverList().subscribe(data => {
      this.drivers = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

  clickAddDriver() {
    this.driverForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(row: Driver) {
    this.showAdd = false;
    this.showUpdate = true;
    this.driverForm.controls['id'].setValue(row.id);
    this.driverForm.controls['firstname'].setValue(row.firstname);
    this.driverForm.controls['lastname'].setValue(row.lastname);
    this.driverForm.controls['licenseNumber'].setValue(row.licenseNumber);
    this.driverForm.controls['phoneNumber'].setValue(row.phoneNumber);
  }

  onUpdate() {

    this.submitted = true;
    if (this.driverForm.invalid) {
      return;
    }
    this.driver.id = this.driverForm.value.id;
    this.driver.firstname = this.driverForm.value.firstname;
    this.driver.lastname = this.driverForm.value.lastname;
    this.driver.licenseNumber = this.driverForm.value.licenseNumber;
    this.driver.phoneNumber = this.driverForm.value.phoneNumber;
    console.log(this.driver);

    this.driverService.updateDriver(this.driver).subscribe(data => {
      // console.log(this.driver.id);
      console.log(data);
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.driverForm.reset();
      this.driverList();
    }, err => {
      console.log(err);
      ;
    })
  }

  deleteDriver(id: number) {
    if (confirm("Do you want to delete this data ?")) {
      this.driverService.deleteDriver(id).subscribe(data => {
        console.log(data);
        alert("Successfully Deleted");
        if (!this.searchMode) {
          this.getPage(this.currentSelectedPage, this.selectedValue);
        } else {
          if (this.searchMode) {
            this.getSearch(this.searchUserId, this.currentSelectedPage, this.selectedValue);
          }
        }
        this.driverList();
      }, (err) => {
        console.log(err);
      })
    }
  }

  get f() {
    return this.driverForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.driverForm.invalid) {
      return;
    }
    this.driver = this.driverForm.value;
    this.driverService.addDriver(this.driver).subscribe(data => {
      console.log(data);
      this.getPage(this.currentSelectedPage, this.selectedValue);
      alert("successfully added");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.driverForm.reset();
      this.driverList();
    }, (err) => {
      alert("Something went wrong");
    });
  }



}
