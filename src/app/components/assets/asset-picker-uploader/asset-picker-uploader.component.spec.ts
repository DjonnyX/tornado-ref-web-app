import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPickerUploaderComponent } from './asset-picker-uploader.component';

describe('AssetPickerUploaderComponent', () => {
  let component: AssetPickerUploaderComponent;
  let fixture: ComponentFixture<AssetPickerUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetPickerUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPickerUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
