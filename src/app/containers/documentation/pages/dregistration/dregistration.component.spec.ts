import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRegistrationComponent } from './dregistration.component';

describe('DRegistrationComponent', () => {
  let component: DRegistrationComponent;
  let fixture: ComponentFixture<DRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
