import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '@app/services/notification.service';
import { BaseComponent } from '@components/base/base-component';
import { FileDownloaderComponent } from '@components/file-downloader/file-downloader.component';
import { ApiService } from '@services';
import { interval, Observable, of, Subject } from 'rxjs';
import { catchError, delay, finalize, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'ta-backups-editor',
  templateUrl: './backups-editor.component.html',
  styleUrls: ['./backups-editor.component.scss']
})
export class BackupsEditorComponent extends BaseComponent implements OnInit {
  @ViewChild("downloader", { static: true }) downloader: FileDownloaderComponent;

  public readonly extensions = [
    '.tdb',
  ];

  isBackupCreating = false;

  private _backupCreatingTime = 0;
  backupCreatingTime$: Observable<number>;

  constructor(private _apiService: ApiService, private _notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {

  }

  onDownloadFile() {
    this.isBackupCreating = true;

    const finish$ = new Subject<void>();

    this.backupCreatingTime$ = interval(10).pipe(
      takeUntil(finish$),
      tap(v => {
        this._backupCreatingTime += 1;

        if (this._backupCreatingTime > 100) {
          this._backupCreatingTime = 0;
        }
        return this._backupCreatingTime;
      }),
      finalize(() => {
        this._backupCreatingTime = 0;
        this.backupCreatingTime$ = of(this._backupCreatingTime);
      }),
    )

    this._apiService.createClientBackups().pipe(
      takeUntil(this.unsubscribe$),
      delay(500),
      map(res => res.data),
      finalize(() => {
        this.isBackupCreating = false;

        finish$.next();
        finish$.complete();
      }),
      catchError((error: Error) => {
        this._notificationService.error(error.message);
        return of(null);
      }),
    ).subscribe(data => {
      if (!data) {
        return;
      }

      this.downloader.download(data);
    });
  }

  onUploadFile(file: File): void {

  }
}
