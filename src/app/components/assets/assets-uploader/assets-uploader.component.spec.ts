import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsUploaderComponent } from './assets-uploader.component';

describe('AssetsUploaderComponent', () => {
  let component: AssetsUploaderComponent;
  let fixture: ComponentFixture<AssetsUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
