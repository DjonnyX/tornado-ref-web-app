import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCreatorFormComponent } from './license-type-creator-form.component';

describe('LanguageCreatorFormComponent', () => {
  let component: LanguageCreatorFormComponent;
  let fixture: ComponentFixture<LanguageCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
