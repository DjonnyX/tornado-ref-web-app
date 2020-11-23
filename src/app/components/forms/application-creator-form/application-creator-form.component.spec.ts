import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreatorFormComponent } from './application-creator-form.component';

describe('ApplicationCreatorFormComponent', () => {
  let component: ApplicationCreatorFormComponent;
  let fixture: ComponentFixture<ApplicationCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
