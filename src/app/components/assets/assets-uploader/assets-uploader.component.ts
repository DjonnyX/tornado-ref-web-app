import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAsset } from '@models';
import { getThumbnail } from '@app/utils/asset.util';

@Component({
  selector: 'ta-assets-uploader',
  templateUrl: './assets-uploader.component.html',
  styleUrls: ['./assets-uploader.component.scss']
})
export class AssetsUploaderComponent implements OnInit {

  @Input() collection: Array<IAsset>;

  @Output() upload = new EventEmitter<File>();

  @Output() update = new EventEmitter<IAsset>();

  @Output() delete = new EventEmitter<IAsset>();

  constructor() { }

  ngOnInit(): void { }

  getThumbnail(asset: IAsset): string {
    return getThumbnail(asset);
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onUploadFile(file: File): void {
    this.upload.emit(file);
  }

  onDeleteAsset(asset: IAsset): void {
    this.delete.emit(asset);
  }

  onToggleActive(event: Event, asset: IAsset): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    this.update.emit({ ...asset, active: !asset.active });
  }
}
