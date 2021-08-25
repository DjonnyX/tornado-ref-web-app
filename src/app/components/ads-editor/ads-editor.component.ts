import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAd, IRef, IAsset, IAdContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-ads-editor-component',
  templateUrl: './ads-editor.component.html',
  styleUrls: ['./ads-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<IAd>;

  @Input() refInfo: IRef;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  private _assetsDictionary: { [id: string]: IAsset } = {};

  private _assets: Array<IAsset>;
  @Input() set assets(v: Array<IAsset>) {
    if (this._assets !== v) {
      this._assets = v;

      this._assets.forEach(asset => {
        this._assetsDictionary[asset.id] = asset;
      });
    }
  }

  get assets() { return this._assets; }

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IAd>();

  @Output() update = new EventEmitter<IAd>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  getAdContent(ad: IAd): IAdContentsItem {
    return ad.contents[this.defaultLanguage?.code];
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getAdName(ad: IAd): string | undefined {
    const adContent = this.getAdContent(ad);
    return adContent?.name;
  }

  getAdColor(ad: IAd): string | undefined {
    const adContent = this.getAdContent(ad);
    return adContent?.color;
  }

  hasThumbnail(ad: IAd, size: "x32" | "x128" = "x32"): boolean {
    const adContent = this.getAdContent(ad);
    const asset = !!adContent?.resources?.main ? this._assetsDictionary[adContent.resources.main] : undefined;
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(ad: IAd, size: "x32" | "x128" = "x32"): string {
    const adContent = this.getAdContent(ad);
    const asset = !!adContent?.resources?.main ? this._assetsDictionary[adContent.resources.main] : undefined;
    return asset?.mipmap?.[size]?.replace("\\", "/") || "";
  }

  onToggleActive(event: Event, ad: IAd): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...ad, active: !ad.active });
  }

  onCreateAd(): void {
    this.create.emit();
  }

  onEditAd(ad: IAd): void {
    this.edit.emit(ad);
  }

  onDeleteAd(ad: IAd): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-ad",
          message: `#{"${this.getAdName(ad)}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(ad.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }
}
