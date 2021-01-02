import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCreatorFormComponent } from './license-creator-form.component';

describe('LicenseCreatorFormComponent', () => {
  let component: LicenseCreatorFormComponent;
  let fixture: ComponentFixture<LicenseCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
