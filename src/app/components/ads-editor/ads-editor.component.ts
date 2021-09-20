import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAd, IRef, IAsset, IAdContentsItem, ILanguage, UserRights } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';
import { LayoutTypes } from '@components/state-panel/state-panel.component';

@Component({
  selector: 'ta-ads-editor-component',
  templateUrl: './ads-editor.component.html',
  styleUrls: ['./ads-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  private _collection: Array<IAd>;
  @Input() set collection(value: Array<IAd>) {
    if (this._collection != value) {
      this._collection = value || [];

      this.resetFilteredCollection();
    }
  }
  get collection() { return this._collection; }

  public filteredCollection: Array<IAd>;

  @Input() refInfo: IRef;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  @Input() rights: Array<UserRights>;

  @Input() layoutType: LayoutTypes;

  private _displayInactiveEntities: boolean = true;
  @Input() set displayInactiveEntities(v: boolean) {
    if (this._displayInactiveEntities !== v) {
      this._displayInactiveEntities = v;

      this.resetFilteredCollection();
    }
  }
  get displayInactiveEntities() { return this._displayInactiveEntities; }

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
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_AD) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_AD) > -1;
  }

  resetFilteredCollection() {
    this.filteredCollection = (this._collection || []).filter(item => (!!item.active || !!this._displayInactiveEntities));
    this._cdr.markForCheck();
  }

  onSwitchLayout(layoutType: LayoutTypes) {
    this.changeLayout.emit(layoutType);
  }

  getAdContent(ad: IAd): IAdContentsItem {
    return ad.contents[this.defaultLanguage?.code];
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getAdvertName(ad: IAd): string | undefined {
    const adContent = this.getAdContent(ad);
    return adContent?.name;
  }

  getAdvertolor(ad: IAd): string | undefined {
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

  onCreateAdvert(): void {
    this.create.emit();
  }

  onEditAdvert(ad: IAd): void {
    this.edit.emit(ad);
  }

  onDeleteAdvert(ad: IAd): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-ad",
          message: `#{"${this.getAdvertName(ad)}" }common_action-will-be-permanently-deleted.`,
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

  onShowHiddenEntities(displayInactiveEntities: boolean) {
    this.changeDisplayInactiveEntities.emit(displayInactiveEntities);
  }
}
