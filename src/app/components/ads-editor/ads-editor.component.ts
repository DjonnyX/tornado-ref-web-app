import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAd, IRef, IAsset, IAdContentsItem, ILanguage } from '@djonnyx/tornado-types';

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

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  getAdContent(ad: IAd): IAdContentsItem {
    return ad.contents[this.defaultLanguage.code];
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

  hasThumbnail(ad: IAd): boolean {
    const adContent = this.getAdContent(ad);
    const asset = !!adContent && !!adContent.resources && !!adContent.resources.main ? this._assetsDictionary[adContent.resources.main] : undefined;
    return !!asset?.mipmap?.x128;
  }

  getThumbnail(ad: IAd): string {
    const adContent = this.getAdContent(ad);
    const asset = !!adContent && !!adContent.resources && !!adContent.resources.main ? this._assetsDictionary[adContent.resources.main] : undefined;
    return asset?.mipmap?.x32?.replace("\\", "/") || "";
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
          title: "Delete the category?",
          message: `"${this.getAdName(ad)}" will be permanently deleted`,
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
