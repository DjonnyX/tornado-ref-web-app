import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckueCreatorContainer } from './checkue-creator.container';

describe('CheckueCreatorContainer', () => {
  let component: CheckueCreatorContainer;
  let fixture: ComponentFixture<CheckueCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckueCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckueCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
