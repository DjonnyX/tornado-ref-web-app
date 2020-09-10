import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreatorContainer } from './store-creator.container';

describe('StoreCreatorContainer', () => {
  let component: StoreCreatorContainer;
  let fixture: ComponentFixture<StoreCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
