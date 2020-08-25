import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { SelectorsSelectors, AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { SelectorsActions } from '@store/actions/selectors.action';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { SelectorActions } from '@store/actions/selector.action';
import { ISelector, ITag, IRef, SelectorTypes, IAsset, ILanguage } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { map, filter } from 'rxjs/operators';
import { LanguagesActions } from '@store/actions/languages.action';

@Component({
  selector: 'ta-selectors-editor',
  templateUrl: './selectors-editor.container.html',
  styleUrls: ['./selectors-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ISelector>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  public tags$: Observable<Array<ITag>>;

  public refInfo$: Observable<IRef>;

  private _selectorsType: SelectorTypes;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._selectorsType = this._activatedRoute.snapshot.data.type;

    this._store.dispatch(SelectorsActions.getAllRequest({ selectorType: this._selectorsType }));

    this._store.dispatch(TagsActions.getAllRequest());

    this._store.dispatch(AssetsActions.getAllRequest());
    
    this._store.dispatch(LanguagesActions.getAllRequest());

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(SelectorsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isProductsProgress, isAssetsProgress, isLanguagesProcess]) => isProductsProgress || isAssetsProgress || isLanguagesProcess),
    );

    this.collection$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(SelectorsSelectors.selectRefInfo),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );
  }

  onCreate(): void {

    this._store.dispatch(SelectorActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url, type: this._selectorsType },
    });
  }

  onEdit(selector: ISelector): void {

    this._store.dispatch(SelectorActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: selector.id, returnUrl: this._router.routerState.snapshot.url, type: this._selectorsType },
    });
  }

  onUpdate(selector: ISelector): void {
    this._store.dispatch(SelectorsActions.updateRequest({ id: selector.id, selector }));
  }

  onDelete(id: string): void {
    this._store.dispatch(SelectorsActions.deleteRequest({ id }));
  }
}
