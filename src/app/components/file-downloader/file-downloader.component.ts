import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface IDownloadData {
  url: string;
  filename: string;
}

@Component({
  exportAs: 'downloader',
  selector: 'ta-file-downloader',
  templateUrl: './file-downloader.component.html',
  styleUrls: ['./file-downloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDownloaderComponent implements OnInit {
  @ViewChild("downloader", { static: true }) downloader: ElementRef;

  data: IDownloadData;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  public download(data: IDownloadData) {
    this.data = data;

    this._cdr.detectChanges();

    setTimeout(() => {
      this.downloader.nativeElement.click();
    });
  }
}
