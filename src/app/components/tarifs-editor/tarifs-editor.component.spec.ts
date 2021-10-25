import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsEditorComponent } from './tarifs-editor.component';

describe('TarifsEditorComponent', () => {
  let component: TarifsEditorComponent;
  let fixture: ComponentFixture<TarifsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
