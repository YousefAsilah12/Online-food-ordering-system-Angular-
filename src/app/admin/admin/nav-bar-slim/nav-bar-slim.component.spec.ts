import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSlimComponent } from './nav-bar-slim.component';

describe('NavBarSlimComponent', () => {
  let component: NavBarSlimComponent;
  let fixture: ComponentFixture<NavBarSlimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarSlimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
