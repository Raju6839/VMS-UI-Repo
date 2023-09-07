import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLicenseSearchTableComponent } from './driver-license-search-table.component';

describe('DriverLicenseSearchTableComponent', () => {
  let component: DriverLicenseSearchTableComponent;
  let fixture: ComponentFixture<DriverLicenseSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverLicenseSearchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverLicenseSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
