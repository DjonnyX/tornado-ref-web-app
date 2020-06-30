import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEditorContainer } from './products-editor.container';

describe('ProductsEditorContainer', () => {
  let component: ProductsEditorContainer;
  let fixture: ComponentFixture<ProductsEditorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsEditorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
