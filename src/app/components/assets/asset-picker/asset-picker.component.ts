import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IAsset } from '@models';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { getThumbnail } from '@app/utils/asset.util';

@Component({
  selector: 'ta-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss']
})
export class AssetPickerComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() size: string;

  @Input() color: string;

  private _defaultValue: string;
  @Input() set defaultValue(v: string) {
    if (!!v && this._defaultValue !== v) {
      this._defaultValue = v;

      this.updateCtrlValue();
    }
  }

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this.updateCtrlValue();
    }
  }

  get assets() { return this._assets; }

  @Output() select = new EventEmitter<IAsset>();

  ctrlAssets = new FormControl();

  private _selectedAsset: IAsset;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.ctrlAssets.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      this._selectedAsset = this.assets.find(asset => asset.id === value);
      this.select.emit(this._selectedAsset);
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  updateCtrlValue(): void {
    if (!!this._assets && !!this._defaultValue) {
      this.ctrlAssets.setValue(this._defaultValue);
    }
  }

  getThumbnail(): string {
    return getThumbnail(this._selectedAsset);
  }
}
