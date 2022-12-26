import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegComponent } from './employee-reg.component';

describe('EmployeeRegComponent', () => {
  let component: EmployeeRegComponent;
  let fixture: ComponentFixture<EmployeeRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
