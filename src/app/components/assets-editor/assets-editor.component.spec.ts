import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsEditorComponent } from './assets-editor.component';

describe('AssetsEditorComponent', () => {
  let component: AssetsEditorComponent;
  let fixture: ComponentFixture<AssetsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
