import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAndLoginComponent } from './reg-and-login.component';

describe('RegAndLoginComponent', () => {
  let component: RegAndLoginComponent;
  let fixture: ComponentFixture<RegAndLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegAndLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAndLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
