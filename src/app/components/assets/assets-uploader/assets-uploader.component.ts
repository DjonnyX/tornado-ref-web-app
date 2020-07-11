import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsset } from '@models';

@Component({
  selector: 'ta-assets-uploader',
  templateUrl: './assets-uploader.component.html',
  styleUrls: ['./assets-uploader.component.scss']
})
export class AssetsUploaderComponent implements OnInit {

  @Input() collection: Observable<IAsset>;

  @Output() upload = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  getThumbnail(asset: IAsset): string {
    return `url(${asset.path.replace('\\', '/')})`;
  }

  onUploadFile(file: File): void {
    this.upload.emit(file);
  }
}
