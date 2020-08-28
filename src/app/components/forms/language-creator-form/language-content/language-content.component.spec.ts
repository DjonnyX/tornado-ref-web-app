import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageContentComponent } from './language-content.component';

describe('LanguageContentComponent', () => {
  let component: LanguageContentComponent;
  let fixture: ComponentFixture<LanguageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
