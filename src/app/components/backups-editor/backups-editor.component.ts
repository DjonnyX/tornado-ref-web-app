import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizationService } from '@app/services/localization/localization.service';
import { NotificationService } from '@app/services/notification.service';
import { BaseComponent } from '@components/base/base-component';
import { FileDownloaderComponent } from '@components/file-downloader/file-downloader.component';
import { ApiService } from '@services';
import { BehaviorSubject, interval, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';

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

  isBackupUploading = false;

  private _backupUploadingTime = 0;
  backupUploadingTime$: Observable<number>;

  constructor(
    private _apiService: ApiService,
    private _notificationService: NotificationService,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  onDownloadFile() {
    this.isBackupCreating = true;

    const finish$ = new Subject<void>();

    this.backupCreatingTime$ = interval(10).pipe(
      takeUntil(finish$),
      map(v => {
        if (this._backupCreatingTime < 100) {
          this._backupCreatingTime += 1;
        } else {
          this._backupCreatingTime = 0;
        }
        return this._backupCreatingTime;
      }),
      finalize(() => {
        this._backupCreatingTime = 0;
        this.backupCreatingTime$ = of(this._backupCreatingTime);
      }),
    );

    this._apiService.createClientBackups().pipe(
      takeUntil(this.unsubscribe$),
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

      this._notificationService.success("Бэкап сгенерирован");
      this.downloader.download(data);
    });
  }

  onUploadFile(file: File): void {
    this.isBackupUploading = true;

    const finish$ = new Subject<void>();

    this.backupUploadingTime$ = interval(10).pipe(
      takeUntil(finish$),
      map(v => {
        if (this._backupUploadingTime < 100) {
          this._backupUploadingTime += 1;
        } else {
          this._backupUploadingTime = 0;
        }
        return this._backupUploadingTime;
      }),
      finalize(() => {
        this._backupUploadingTime = 0;
        this.backupUploadingTime$ = of(this._backupUploadingTime);
      }),
    );


    this._apiService.uploadBackup(file).pipe(
      map(res => {
        if (!res) {
          return 0;
        }

        if (!!res.data.progress) {
          return res.data.progress;
        }

        return -1;
      }),
      catchError((error: Error) => {
        this._notificationService.error(error.message);
        return of(null);
      }),
    ).subscribe(progress => {
      // err
      if (progress === null) {
        this.isBackupUploading = false;
        return;
      }

      // ok
      if (progress === -1) {
        this.isBackupUploading = false;

        finish$.next();
        finish$.complete();

        this._notificationService.success("База данных восстановлена");
      } else {
        /// this._backupUploadingTime$.next(progress);
      }
    });
  }
}
