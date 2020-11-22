import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeCreatorContainer } from './license-type-creator.container';

describe('LicenseTypeCreatorContainer', () => {
  let component: LicenseTypeCreatorContainer;
  let fixture: ComponentFixture<LicenseTypeCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseTypeCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseTypeCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
