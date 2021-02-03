import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCreatorContainer } from './integration-creator.container';

describe('IntegrationCreatorContainer', () => {
  let component: IntegrationCreatorContainer;
  let fixture: ComponentFixture<IntegrationCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
