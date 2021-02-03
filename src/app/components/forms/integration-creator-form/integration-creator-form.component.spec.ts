import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationCreatorFormComponent } from './integration-creator-form.component';

describe('IntegrationCreatorFormComponent', () => {
  let component: IntegrationCreatorFormComponent;
  let fixture: ComponentFixture<IntegrationCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
