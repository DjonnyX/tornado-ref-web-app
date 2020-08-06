import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ISelector, ITag, IRef, IAsset } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-selectors-editor-component',
  templateUrl: './selectors-editor.component.html',
  styleUrls: ['./selectors-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ISelector>;

  @Input() refInfo: IRef;

  @Input() tagList: Array<ITag>;
  
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

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getTagColor(id: string): string {
    const tag = this.tagList.find(t => t.id === id);
    return !!tag ? tag.color : "";
  }

  getTagName(id: string): string {
    const tag = this.tagList.find(t => t.id === id);
    return !!tag ? tag.name : "";
  }
  
  hasThumbnail(assetId: string): boolean {
    const asset = this._assetsDictionary[assetId];
    return !!asset && !!asset.mipmap && !!asset.mipmap.x128;
  }

  getThumbnail(assetId: string): string {
    const asset = this._assetsDictionary[assetId];
    return !!asset && !!asset.mipmap && !!asset.mipmap.x32 ? asset.mipmap.x32.replace("\\", "/") : "";
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
          title: "Delete the category?",
          message: `"${selector.name}" will be permanently deleted`,
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
}
