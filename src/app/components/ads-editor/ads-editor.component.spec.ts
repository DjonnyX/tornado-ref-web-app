import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsEditorComponent } from './ads-editor.component';

describe('AdsEditorComponent', () => {
  let component: AdsEditorComponent;
  let fixture: ComponentFixture<AdsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
