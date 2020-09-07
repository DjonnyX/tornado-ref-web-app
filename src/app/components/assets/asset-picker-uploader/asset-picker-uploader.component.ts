import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IAsset } from '@models';
import { BaseComponent } from '@components/base/base-component';

@Component({
  selector: 'ta-asset-picker-uploader',
  templateUrl: './asset-picker-uploader.component.html',
  styleUrls: ['./asset-picker-uploader.component.scss']
})
export class AssetPickerUploaderComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() extensions: Array<string> = ['.png', '.jpg'];

  @Input() size: string;

  @Input() color: string;

  private _defaultValue: string;
  @Input() set defaultValue(v: string) {
    if (!!v && this._defaultValue !== v) {
      this._defaultValue = v;

      this.updateAsset();
    }
  }

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;
      this.isLoading = true;

      this.updateAsset();
    }
  }

  get assets() { return this._assets; }

  @Output() upload = new EventEmitter<File>();

  asset: IAsset;

  isLoading: boolean = true;

  isError: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void { }

  onUploadFile(file: File): void {
    this.isLoading = false;
    this.isError = false;
    this.upload.emit(file);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  updateAsset(): void {
    if (!!this._assets && !!this._defaultValue) {
      this.asset = this.assets.find(asset => asset.id === this._defaultValue);
    }
  }

  loadingComplete() {
    this.isLoading = false;
  }

  loadingError() {
    this.isLoading = false;
    this.isError = true;
  }

  getThumbnail(): string {
    return this.asset?.mipmap?.x128;
  }
}
