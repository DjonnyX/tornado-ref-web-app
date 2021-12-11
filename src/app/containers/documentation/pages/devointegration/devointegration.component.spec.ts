import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DEvoIntegrationComponent } from './devointegration.component';

describe('DEvoIntegrationComponent', () => {
  let component: DEvoIntegrationComponent;
  let fixture: ComponentFixture<DEvoIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DEvoIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DEvoIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
