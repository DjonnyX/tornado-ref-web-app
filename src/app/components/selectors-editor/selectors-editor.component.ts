import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ISelector, ITag, IRef, IAsset, ISelectorContentsItem, ILanguage, ISystemTag, UserRights } from '@djonnyx/tornado-types';
import { ITagContentsItem } from '@djonnyx/tornado-types/dist/interfaces/raw/ITagContents';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { LocalizationService } from '@app/services/localization/localization.service';

@Pipe({
  name: 'filterSelectors'
})
export class FilterSelectorsPipe implements PipeTransform {
  transform(items: Array<ISelector>, systemTag: ISystemTag | undefined): any[] {
    if (!items) return [];
    return items.filter(s => s.systemTag === systemTag?.id);
  }
}

@Component({
  selector: 'ta-selectors-editor-component',
  templateUrl: './selectors-editor.component.html',
  styleUrls: ['./selectors-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  private _collection: Array<ISelector>;
  @Input() set collection(value: Array<ISelector>) {
    if (this._collection != value) {
      this._collection = value || [];

      this.resetFilteredCollection();
      
      this.resetActualSystemTags();
    }
  }

  public filteredCollection: Array<ISelector>;

  private _systemTags: Array<ISystemTag>;
  @Input() set systemTags(v: Array<ISystemTag>) {
    if (this._systemTags !== v) {
      this._systemTags = v;

      this.resetActualSystemTags();
    }
  }
  get systemTags() { return this._systemTags; }

  actualSystemTags: Array<ISystemTag>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  @Input() rights: Array<UserRights>;

  @Input() layoutType: LayoutTypes;

  private _displayInactiveEntities: boolean = true;
  @Input() set displayInactiveEntities(v: boolean) {
    if (this._displayInactiveEntities !== v) {
      this._displayInactiveEntities = v;

      this.resetFilteredCollection();

      this.resetActualSystemTags();
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

  @Output() edit = new EventEmitter<ISelector>();

  @Output() update = new EventEmitter<ISelector>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  resetActualSystemTags() {
    if (!this._collection || !this._systemTags) {
      return;
    }

    const systemTags: Array<string> = [];
    for (let product of this._collection) {
      if (product.systemTag !== undefined && systemTags.indexOf(product.systemTag) === -1) {
        systemTags.push(product.systemTag);
      }
    }

    this.actualSystemTags = this._systemTags.filter(s => {
      return systemTags.indexOf(s.id) > -1;
    });

    // не распределенная категория
    this.actualSystemTags.push(undefined);
  }

  resetFilteredCollection() {
    this.filteredCollection = (this._collection || []).filter(item => (!!item.active || !!this._displayInactiveEntities));
    this._cdr.markForCheck();
  }

  onSwitchLayout(layoutType: LayoutTypes) {
    this.changeLayout.emit(layoutType);
  }

  getSelectorContent(selector: ISelector): ISelectorContentsItem {
    return selector.contents[this.defaultLanguage?.code];
  }

  getTagContent(tag: ITag): ITagContentsItem {
    return tag.contents[this.defaultLanguage?.code];
  }

  getTagColor(id: string): string {
    const tag = this.tagList?.find(t => t.id === id);
    const tagContent = this.getTagContent(tag);
    return tagContent?.color || "";
  }

  getTagName(id: string): string {
    const tag = this.tagList?.find(t => t.id === id);
    const tagContent = this.getTagContent(tag);
    return tagContent?.name || "";
  }

  getSelectorName(selector: ISelector): string | undefined {
    const selectorContent = this.getSelectorContent(selector);
    return selectorContent?.name;
  }

  getSelectorDescription(selector: ISelector): string | undefined {
    const selectorContent = this.getSelectorContent(selector);
    return selectorContent?.description || "";
  }

  getSelectorColor(selector: ISelector): string | undefined {
    const selectorContent = this.getSelectorContent(selector);
    return selectorContent?.color;
  }

  hasThumbnail(selector: ISelector, size: "x32" | "x128" = "x32"): boolean {
    const selectorContent = this.getSelectorContent(selector);
    const asset = !!selectorContent?.resources?.main ? this._assetsDictionary[selectorContent.resources.main] : undefined;
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(selector: ISelector, size: "x32" | "x128" = "x32"): string {
    const selectorContent = this.getSelectorContent(selector);
    const asset = !!selectorContent && !!selectorContent.resources && !!selectorContent.resources.main ? this._assetsDictionary[selectorContent.resources.main] : undefined;
    return asset?.mipmap?.[size]?.replace("\\", "/");
  }

  onToggleActive(event: Event, selector: ISelector): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...selector, active: !selector.active });
  }

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_SELECTOR) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_SELECTOR) > -1;
  }

  onCreateSelector(): void {
    this.create.emit();
  }

  onEditSelector(selector: ISelector): void {
    this.edit.emit(selector);
  }

  onDeleteSelector(selector: ISelector): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-category",
          message: `#{"${this.getSelectorName(selector)}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(selector.id);
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
