import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagActions } from '@store/actions/tag.action';
import { ITag, IRef, IAsset, ILanguage } from '@djonnyx/tornado-types';
import { AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { map, filter } from 'rxjs/operators';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';

@Component({
  selector: 'ta-tags-editor',
  templateUrl: './tags-editor.container.html',
  styleUrls: ['./tags-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ITag>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToShow$: Observable<boolean>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(TagsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isProductsProgress, isAssetsProgress, isLanguageProgress]) =>
        isProductsProgress || isAssetsProgress || isLanguageProgress),
    );

    this.collection$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(TagsSelectors.selectRefInfo),
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
    ]).pipe(
      map(([collection, assets, languages]) =>
        !!collection && !!assets && !!languages),
    );

    this._store.dispatch(TagsActions.getAllRequest());
    this._store.dispatch(AssetsActions.getAllRequest());
    this._store.dispatch(LanguagesActions.getAllRequest());
  }

  ngOnDestroy(): void {
    this._store.dispatch(TagsActions.clear());
    this._store.dispatch(AssetsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(TagActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(tag: ITag): void {
    this._store.dispatch(TagActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: tag.id, },
    });
  }

  onUpdate(tag: ITag): void {
    this._store.dispatch(TagsActions.updateRequest({ id: tag.id, tag }));
  }

  onDelete(id: string): void {
    this._store.dispatch(TagsActions.deleteRequest({ id }));
  }
}
