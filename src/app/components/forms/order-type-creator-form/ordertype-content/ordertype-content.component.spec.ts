import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertypeContentComponent } from './ordertype-content.component';

describe('OrdertypeContentComponent', () => {
  let component: OrdertypeContentComponent;
  let fixture: ComponentFixture<OrdertypeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdertypeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdertypeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
