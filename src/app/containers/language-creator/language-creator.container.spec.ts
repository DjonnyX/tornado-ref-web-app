import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCreatorContainer } from './language-creator.container';

describe('LanguageCreatorContainer', () => {
  let component: LanguageCreatorContainer;
  let fixture: ComponentFixture<LanguageCreatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageCreatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCreatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
