import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreatorFormComponent } from './product-creator-form.component';

describe('ProductCreatorFormComponent', () => {
  let component: ProductCreatorFormComponent;
  let fixture: ComponentFixture<ProductCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
