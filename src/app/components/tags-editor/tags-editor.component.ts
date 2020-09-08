import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, IRef, IAsset, ITagContentsItem, ILanguage } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-tags-editor-component',
  templateUrl: './tags-editor.component.html',
  styleUrls: ['./tags-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ITag>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

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

  @Output() edit = new EventEmitter<ITag>();

  @Output() update = new EventEmitter<ITag>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(public dialog: MatDialog) {
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

  hasThumbnail(tag: ITag): boolean {
    const tagContent = this.getContent(tag);
    const asset = !!tagContent && !!tagContent.resources && !!tagContent.resources.main ? this._assetsDictionary[tagContent.resources.main] : undefined;
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128;
  }

  getThumbnail(tag: ITag): string {
    const tagContent = this.getContent(tag);
    const asset = !!tagContent && !!tagContent.resources && !!tagContent.resources.main ? this._assetsDictionary[tagContent.resources.main] : undefined;
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? asset.mipmap.x32.replace("\\", "/") : "";
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
}
