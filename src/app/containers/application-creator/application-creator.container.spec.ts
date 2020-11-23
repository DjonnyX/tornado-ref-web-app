import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreatorContainer } from './application-creator.container';

describe('ApplicationCreatorContainer', () => {
  let component: ApplicationCreatorContainer;
  let fixture: ComponentFixture<ApplicationCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
