import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset } from '@models';
import { IProduct, IRef, ITag, ILanguage, IProductContentsItem, UserRights, ISystemTag, ICurrency, IEntityPosition } from '@djonnyx/tornado-types';
import { ITagContentsItem } from '@djonnyx/tornado-types/dist/interfaces/raw/ITagContents';
import { LayoutTypes } from '@components/state-panel/state-panel.component';

import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '@app/services/localization/localization.service';
import { IActionMenuItem } from '@components/action-menu/action-menu.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {
  transform(items: Array<IProduct>, systemTag: ISystemTag | undefined): any[] {
    if (!items) return [];
    return items.filter(p => (!p.systemTag && !systemTag?.id) || p.systemTag == systemTag?.id);
  }
}

@Pipe({
  name: 'sortProducts'
})
export class SortProductsPipe implements PipeTransform {
  transform(items: Array<any>, prop: string): any[] {
    if (!items) return [];
    return items.sort((a, b) => Number(a?.[prop]) - Number(b?.[prop]));
  }
}

@Component({
  selector: 'ta-products-editor-component',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  public filteredCollection: Array<IProduct>;

  private _collection: Array<IProduct>;
  @Input() set collection(v: Array<IProduct>) {
    if (this._collection !== v) {
      this._collection = v || [];

      this.resetFilteredCollection();

      this.resetActualSystemTags();
    }
  }
  get collection() { return this._collection; }

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

  private _currenciesMap: { [code: string]: ICurrency } = {};
  private _currencies: Array<ICurrency>;
  @Input() set currencies(v: Array<ICurrency>) {
    if (this._currencies !== v) {
      this._currencies = v;

      this._currenciesMap = {};
      this._currencies?.forEach(c => {
        this._currenciesMap[c.id] = c;
      });
    }
  }

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

  @Output() edit = new EventEmitter<IProduct>();

  @Output() update = new EventEmitter<IProduct>();

  @Output() reposition = new EventEmitter<Array<IEntityPosition>>();

  @Output() repositionSystemTags = new EventEmitter<Array<IEntityPosition>>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  getActionMenuItems(product: IProduct): Array<IActionMenuItem> {
    const items = [{
      translateKey: product.active ? this.localization.get("common_action-deactivate") :
        this.localization.get("common_action-activate"),
      icon: "",
      trigger: () => {
        this.onToggleActive(product);
      }
    },
    {
      translateKey: this.localization.get("common_action-edit"),
      icon: "",
      trigger: () => {
        this.onEditProduct(product);
      }
    }];

    if (this.hasDelete()) {
      items.push({
        translateKey: product.active ? this.localization.get("common_action-deactivate") :
          this.localization.get("common_action-delete"),
        icon: "",
        trigger: () => {
          this.onDeleteProduct(product);
        }
      });
    }
    return items;
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getPrices(product: IProduct): string {
    let result = "";

    product?.prices?.forEach((p, i) => {
      if (!!this._currenciesMap[p.currency]) {
        if (i > 0) {
          result += "; ";
        }

        result += `${((p.value || 0) * 0.01).toFixed(0)}${this._currenciesMap[p.currency]?.symbol}`;
      }
    });

    return result;
  }

  resetActualSystemTags() {
    if (!this._collection || !this._systemTags) {
      return;
    }

    const systemTags: Array<string> = [];
    for (let product of this._collection) {
      if (!!product.systemTag && systemTags.indexOf(product.systemTag) === -1) {
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

  getProductContent(product: IProduct): IProductContentsItem {
    return product.contents[this.defaultLanguage.code];
  }

  getTagContent(tag: ITag): ITagContentsItem {
    if (!tag) {
      return undefined;
    }

    return tag?.contents[this.defaultLanguage.code];
  }

  getTagColor(id: string): string {
    const tag = this.tagList?.find(t => t.id === id);
    const tagContent = this.getTagContent(tag);
    return tagContent?.color || "";
  }

  getTagActivity(id: string): boolean {
    const tag = this.tagList?.find(t => t.id === id);
    return tag?.active || false;
  }

  getTagName(id: string): string {
    const tag = this.tagList?.find(t => t.id === id);
    const tagContent = this.getTagContent(tag);
    return tagContent?.name || "";
  }

  getProductName(product: IProduct): string | undefined {
    const productContent = this.getProductContent(product);
    return productContent?.name;
  }

  getProductDescription(product: IProduct): string | undefined {
    const productContent = this.getProductContent(product);
    return productContent?.description || "";
  }

  getProductColor(product: IProduct): string | undefined {
    const productContent = this.getProductContent(product);
    return productContent?.color;
  }

  hasThumbnail(product: IProduct, size: "x32" | "x128" = "x32"): boolean {
    const productContent = this.getProductContent(product);
    const asset = !!productContent && !!productContent.resources && !!productContent.resources.main ? this._assetsDictionary[productContent.resources.main] : undefined;
    return !!asset?.mipmap?.[size];
  }

  getThumbnail(product: IProduct, size: "x32" | "x128" = "x32"): string {
    const productContent = this.getProductContent(product);
    const asset = !!productContent && !!productContent.resources && !!productContent.resources.main ? this._assetsDictionary[productContent.resources.main] : undefined;
    return asset?.mipmap?.[size]?.replace("\\", "/");
  }

  onToggleActive(product: IProduct): void {
    this.update.emit({ ...product, active: !product.active });
  }

  onCreateProduct(): void {
    this.create.emit();
  }

  onEditProduct(product: IProduct): void {
    this.edit.emit(product);
  }

  onDeleteProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-product",
          message: `#{"${this.getProductName(product)}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(product.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  hasCreate() {
    return this.rights.indexOf(UserRights.CREATE_PRODUCT) > -1;
  }

  hasDelete() {
    return this.rights.indexOf(UserRights.DELETE_PRODUCT) > -1;
  }

  onShowHiddenEntities(displayInactiveEntities: boolean) {
    this.changeDisplayInactiveEntities.emit(displayInactiveEntities);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    const item = event.item.data as IProduct;
    const globalPreviousIndex = this._collection?.findIndex(i => i === item);
    if (globalPreviousIndex === -1) {
      throw Error("Item not found");
    }

    const offset = event.currentIndex - event.previousIndex;
    const globalCurrentIndex = globalPreviousIndex + offset;

    const collection = [...(this._collection || [])];
    const product = collection[globalPreviousIndex];
    collection.splice(globalPreviousIndex, 1);
    collection.splice(globalCurrentIndex, 0, product);
    this.reposition.emit(
      collection.map((product, index) => ({
        id: product.id,
        position: index,
      }))
    );
  }

  onDropSystemTag(event: CdkDragDrop<string[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const collection = [...(this._systemTags || [])];
    const systemTag = event.item.data;
    collection.splice(previousIndex, 1);
    collection.splice(currentIndex, 0, systemTag);
    const positions = collection.filter(st => !!st).map((st, index) => ({
      id: st.id,
      position: index,
    }));
    this.repositionSystemTags.emit(
      positions
    );
  }
}
