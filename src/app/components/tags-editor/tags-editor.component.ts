import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, IRef, IAsset, ITagContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { LayoutTypes } from '@components/state-panel/state-panel.component';

@Component({
  selector: 'ta-tags-editor-component',
  templateUrl: './tags-editor.component.html',
  styleUrls: ['./tags-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  private _collection: Array<ITag>;
  @Input() set collection(value: Array<ITag>) {
    if (this._collection != value) {
      this._collection = value || [];

      this.resetFilteredCollection();
    }
  }

  public filteredCollection: Array<ITag>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

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

  @Output() edit = new EventEmitter<ITag>();

  @Output() update = new EventEmitter<ITag>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getContent(tag: ITag): ITagContentsItem {
    return tag.contents[this.defaultLanguage.code];
  }

  getName(tag: ITag): string | undefined {
    const tagContent = this.getContent(tag);
    return !!tagContent ? tagContent.name : undefined;
  }

  getDescription(tag: ITag): string | undefined {
    const tagContent = this.getContent(tag);
    return !!tagContent ? tagContent.description : undefined;
  }

  getColor(tag: ITag): string | undefined {
    const tagContent = this.getContent(tag);
    return !!tagContent ? tagContent.color : undefined;
  }

  hasThumbnail(tag: ITag, size: "x32" | "x128" = "x32"): boolean {
    const tagContent = this.getContent(tag);
    const asset = !!tagContent && !!tagContent.resources && !!tagContent.resources.main ? this._assetsDictionary[tagContent.resources.main] : undefined;
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(tag: ITag, size: "x32" | "x128" = "x32"): string {
    const tagContent = this.getContent(tag);
    const asset = !!tagContent && !!tagContent.resources && !!tagContent.resources.main ? this._assetsDictionary[tagContent.resources.main] : undefined;
    return asset?.mipmap?.[size]?.replace("\\", "/");
  }

  onToggleActive(event: Event, tag: ITag): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit({ ...tag, active: !tag.active });
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(tag: ITag): void {
    this.edit.emit(tag);
  }

  onDelete(tag: ITag): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить тэг?",
          message: `"${this.getName(tag)}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(tag.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  resetFilteredCollection() {
    this.filteredCollection = (this._collection || []).filter(item => (!!item.active || !!this._displayInactiveEntities));
    this._cdr.markForCheck();
  }

  onSwitchLayout(layoutType: LayoutTypes) {
    this.changeLayout.emit(layoutType);
  }

  onShowHiddenEntities(displayInactiveEntities: boolean) {
    this.changeDisplayInactiveEntities.emit(displayInactiveEntities);
  }
}
