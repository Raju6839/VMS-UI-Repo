import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNavBarComponent } from './full-nav-bar.component';

describe('FullNavBarComponent', () => {
  let component: FullNavBarComponent;
  let fixture: ComponentFixture<FullNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
