import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNumberSearchTableComponent } from './vehicle-number-search-table.component';

describe('VehicleNumberSearchTableComponent', () => {
  let component: VehicleNumberSearchTableComponent;
  let fixture: ComponentFixture<VehicleNumberSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNumberSearchTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleNumberSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
