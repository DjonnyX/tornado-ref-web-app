import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypesEditorComponent } from './order-types-editor.component';

describe('OrderTypesEditorComponent', () => {
  let component: OrderTypesEditorComponent;
  let fixture: ComponentFixture<OrderTypesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
