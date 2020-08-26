import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeContentComponent } from './order-type-content.component';

describe('OrderTypeContentComponent', () => {
  let component: OrderTypeContentComponent;
  let fixture: ComponentFixture<OrderTypeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
