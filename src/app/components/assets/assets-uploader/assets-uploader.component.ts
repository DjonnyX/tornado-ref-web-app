import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAsset } from '@models';

@Component({
  selector: 'ta-assets-uploader',
  templateUrl: './assets-uploader.component.html',
  styleUrls: ['./assets-uploader.component.scss']
})
export class AssetsUploaderComponent implements OnInit {

  @Input() collection: Array<IAsset>;

  @Output() upload = new EventEmitter<File>();

  @Output() delete = new EventEmitter<IAsset>();

  constructor() { }

  ngOnInit(): void { }

  getThumbnail(asset: IAsset): string {
    return !!asset.thumbnail ? `url(${asset.thumbnail.replace('\\', '/')})` : "";
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
}
