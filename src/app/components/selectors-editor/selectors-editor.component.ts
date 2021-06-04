import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ISelector, ITag, IRef, IAsset, ISelectorContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { ITagContentsItem } from '@djonnyx/tornado-types/dist/interfaces/raw/ITagContents';
import { LayoutTypes } from '@components/state-panel/state-panel.component';

@Component({
  selector: 'ta-selectors-editor-component',
  templateUrl: './selectors-editor.component.html',
  styleUrls: ['./selectors-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  layoutType: LayoutTypes;

  isShowHiddenEntities: boolean = true;

  private _collection: Array<ISelector>;
  @Input() set collection(value: Array<ISelector>) {
    if (this._collection != value) {
      this._collection = value || [];

      this.resetFilteredCollection();
    }
  }

  public filteredCollection: Array<ISelector>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;

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

  @Output() edit = new EventEmitter<ISelector>();

  @Output() update = new EventEmitter<ISelector>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog, private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  resetFilteredCollection() {
    this.filteredCollection = (this._collection || []).filter(item => (!!item.active || !!this.isShowHiddenEntities));
    this._cdr.markForCheck();
  }

  onSwitchLayout(layoutType: LayoutTypes) {
    this.layoutType = layoutType;
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
    return selectorContent?.description;
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
          title: "Удалить категорию?",
          message: `"${this.getSelectorName(selector)}" будет безвозвратно удален.`,
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

  onShowHiddenEntities(isShowHiddenEntities: boolean) {
    this.isShowHiddenEntities = isShowHiddenEntities;
    this.resetFilteredCollection();
  }
}
