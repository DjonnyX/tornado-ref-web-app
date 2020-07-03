import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCreatorFormComponent } from './selector-creator-form.component';

describe('SelectorCreatorFormComponent', () => {
  let component: SelectorCreatorFormComponent;
  let fixture: ComponentFixture<SelectorCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
