import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreatorFormComponent } from './store-creator-form.component';

describe('StoreCreatorFormComponent', () => {
  let component: StoreCreatorFormComponent;
  let fixture: ComponentFixture<StoreCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
