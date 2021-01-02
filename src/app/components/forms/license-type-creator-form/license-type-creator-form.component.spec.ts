import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeCreatorFormComponent } from './license-type-creator-form.component';

describe('LicenseTypeCreatorFormComponent', () => {
  let component: LicenseTypeCreatorFormComponent;
  let fixture: ComponentFixture<LicenseTypeCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseTypeCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseTypeCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
