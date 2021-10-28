import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceByDevicesComponent } from './price-by-devices.component';

describe('PriceByDevicesComponent', () => {
  let component: PriceByDevicesComponent;
  let fixture: ComponentFixture<PriceByDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceByDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceByDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
