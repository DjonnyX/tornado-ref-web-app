import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHierarchyEditorComponent } from './product-hierarchy-editor.component';

describe('ProductHierarchyEditorComponent', () => {
  let component: ProductHierarchyEditorComponent;
  let fixture: ComponentFixture<ProductHierarchyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHierarchyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHierarchyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
