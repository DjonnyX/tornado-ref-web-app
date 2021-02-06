import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseAccountCreatorFormComponent } from './license-account-creator-form.component';

describe('LicenseAccountCreatorFormComponent', () => {
  let component: LicenseAccountCreatorFormComponent;
  let fixture: ComponentFixture<LicenseAccountCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseAccountCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseAccountCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
