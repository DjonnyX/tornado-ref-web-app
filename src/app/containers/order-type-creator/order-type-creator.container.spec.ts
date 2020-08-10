import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeCreatorContainer } from './order-type-creator.container';

describe('OrderTypeCreatorContainer', () => {
  let component: OrderTypeCreatorContainer;
  let fixture: ComponentFixture<OrderTypeCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
