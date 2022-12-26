import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLayoutComponent } from './reg-layout.component';

describe('RegLayoutComponent', () => {
  let component: RegLayoutComponent;
  let fixture: ComponentFixture<RegLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
