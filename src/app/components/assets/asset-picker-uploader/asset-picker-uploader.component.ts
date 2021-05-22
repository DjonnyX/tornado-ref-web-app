import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { IAsset } from '@models';
import { BaseComponent } from '@components/base/base-component';
import { FileSelectorComponent } from '../file-selector/file-selector.component';

@Component({
  selector: 'ta-asset-picker-uploader',
  templateUrl: './asset-picker-uploader.component.html',
  styleUrls: ['./asset-picker-uploader.component.scss']
})
export class AssetPickerUploaderComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild("fileSelector", { static: true }) fileSelector: FileSelectorComponent;

  @Input() extensions: Array<string> = ['.png', '.jpg'];

  @Input() size: string;

  @Input() color: string;

  @Input() resetButtonShow: boolean = true;

  @Input() resetButtonDisabled: boolean;

  @Input() needConfirmation: boolean = false;

  private _defaultValue: string;
  @Input() set defaultValue(v: string) {
    if (!!v && this._defaultValue !== v) {
      this._defaultValue = v;

      this.isLoading = true;

      this.updateAsset();
    }
  }

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this.updateAsset();
    }
  }

  get assets() { return this._assets; }

  @Output() upload = new EventEmitter<File>();

  @Output() reset = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<Function>();

  asset: IAsset;

  isLoading: boolean = false;

  isError: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onConfirm() {
    const handler = () => { this.fileSelector.open(); };
    if (this.needConfirmation) {
      this.confirm.emit(handler);
      return;
    }

    handler();
  }

  onUploadFile(file: File): void {
    this.isLoading = false;
    this.isError = false;
    this.upload.emit(file);
  }

  onReset(): void {
    this.reset.emit();
  }

  updateAsset(): void {
    if (!!this._assets && !!this._defaultValue) {
      this.asset = this.assets.find(asset => asset.id === this._defaultValue);
    }
  }

  loadingComplete() {
    this.isLoading = this.isError = false;
  }

  loadingError() {
    this.isLoading = false;
    this.isError = true;
  }

  getThumbnail(): string {
    return this.asset?.mipmap?.x128;
  }
}
