import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DLicensesComponent } from './dlicenses.component';

describe('DLicensesComponent', () => {
  let component: DLicensesComponent;
  let fixture: ComponentFixture<DLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DLicensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
