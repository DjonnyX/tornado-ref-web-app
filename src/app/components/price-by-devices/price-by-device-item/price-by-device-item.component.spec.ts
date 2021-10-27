import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceByDeviceItemComponent } from './price-by-device-item.component';

describe('PriceByDeviceItemComponent', () => {
  let component: PriceByDeviceItemComponent;
  let fixture: ComponentFixture<PriceByDeviceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceByDeviceItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceByDeviceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
