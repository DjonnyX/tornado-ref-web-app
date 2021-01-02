import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCreatorContainer } from './license-creator.container';

describe('LicenseCreatorContainer', () => {
  let component: LicenseCreatorContainer;
  let fixture: ComponentFixture<LicenseCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
