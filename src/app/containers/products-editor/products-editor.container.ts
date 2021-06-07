import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsSelectors, AssetsSelectors, LanguagesSelectors, UserSelectors, SystemTagsSelectors } from '@store/selectors';
import { ProductsActions } from '@store/actions/products.action';
import { IAsset } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { ProductActions } from '@store/actions/product.action';
import { AssetsActions } from '@store/actions/assets.action';
import { BaseComponent } from '@components/base/base-component';
import { map, filter } from 'rxjs/operators';
import { IProduct, ITag, IRef, ILanguage, UserRights, ISystemTag } from '@djonnyx/tornado-types';
import { LanguagesActions } from '@store/actions/languages.action';
import { SystemTagsActions } from '@store/actions/system-tags.action';

@Component({
  selector: 'ta-products-editor',
  templateUrl: './products-editor.container.html',
  styleUrls: ['./products-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isPrepareToShow$: Observable<boolean>;

  public collection$: Observable<Array<IProduct>>;

  public tags$: Observable<Array<ITag>>;

  public systemTags$: Observable<Array<ISystemTag>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  public refInfo$: Observable<IRef>;

  rights$: Observable<Array<UserRights>>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.rights$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(p => p?.account?.rights || []),
    );

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(ProductsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(TagsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(SystemTagsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isProductsProgress, isAssetsProgress, isTagsProgress, isLanguagesProcess, isSystemTagsProcess]) =>
        isProductsProgress || isAssetsProgress || isTagsProgress || isLanguagesProcess || isSystemTagsProcess),
    );

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.systemTags$ = this._store.pipe(
      select(SystemTagsSelectors.selectCollection),
    );

    this.collection$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(ProductsSelectors.selectRefInfo),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.isPrepareToShow$ = combineLatest([
      this.collection$,
      this.assets$,
      this.languages$,
      this.tags$,
      this.systemTags$,
    ]).pipe(
      map(([collection, assets, languages, tags, systemTags]) =>
        !!collection && !!assets && !!languages && !!tags && !!systemTags),
    );

    this._store.dispatch(ProductsActions.getAllRequest({}));
    this._store.dispatch(TagsActions.getAllRequest({}));
    this._store.dispatch(SystemTagsActions.getAllRequest({}));
    this._store.dispatch(AssetsActions.getAllRequest());
    this._store.dispatch(LanguagesActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(ProductsActions.clear());
    this._store.dispatch(TagsActions.clear());
    this._store.dispatch(SystemTagsActions.clear());
    this._store.dispatch(AssetsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(ProductActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(product: IProduct): void {
    this._store.dispatch(ProductActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: product.id, }
    });
  }

  onUpdate(product: IProduct): void {
    this._store.dispatch(ProductsActions.updateRequest({ id: product.id, product }));
  }

  onDelete(id: string): void {
    this._store.dispatch(ProductsActions.deleteRequest({ id }));
  }
}
