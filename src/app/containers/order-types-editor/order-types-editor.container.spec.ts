import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypesEditorContainer } from './order-types-editor.container';

describe('OrderTypesEditorContainer', () => {
  let component: OrderTypesEditorContainer;
  let fixture: ComponentFixture<OrderTypesEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypesEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypesEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
