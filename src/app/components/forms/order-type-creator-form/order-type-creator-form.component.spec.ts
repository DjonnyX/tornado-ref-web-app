import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeCreatorFormComponent } from './order-type-creator-form.component';

describe('OrderTypeCreatorFormComponent', () => {
  let component: OrderTypeCreatorFormComponent;
  let fixture: ComponentFixture<OrderTypeCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
