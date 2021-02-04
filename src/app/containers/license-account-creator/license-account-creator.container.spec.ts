import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseAccountCreatorContainer } from './license-account-creator.container';

describe('LicenseAccountCreatorContainer', () => {
  let component: LicenseAccountCreatorContainer;
  let fixture: ComponentFixture<LicenseAccountCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseAccountCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseAccountCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
