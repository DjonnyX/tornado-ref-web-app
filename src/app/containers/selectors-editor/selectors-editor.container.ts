import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { SelectorsSelectors, AssetsSelectors, LanguagesSelectors, SettingsSelectors, SystemTagsSelectors, UserSelectors } from '@store/selectors';
import { SelectorsActions } from '@store/actions/selectors.action';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { SelectorActions } from '@store/actions/selector.action';
import { ISelector, ITag, IRef, SelectorTypes, IAsset, ILanguage, ISystemTag, UserRights, IEntityPosition } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { map, filter } from 'rxjs/operators';
import { LanguagesActions } from '@store/actions/languages.action';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { SettingsActions } from '@store/actions/settings.action';
import { SystemTagsActions } from '@store/actions/system-tags.action';

@Component({
  selector: 'ta-selectors-editor',
  templateUrl: './selectors-editor.container.html',
  styleUrls: ['./selectors-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isPrepareToShow$: Observable<boolean>;

  public collection$: Observable<Array<ISelector>>;

  public systemTags$: Observable<Array<ISystemTag>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  public tags$: Observable<Array<ITag>>;

  rights$: Observable<Array<UserRights>>;

  public refInfo$: Observable<IRef>;

  private _selectorsType: SelectorTypes;

  layoutType$: Observable<LayoutTypes>;

  displayInactiveEntities$: Observable<boolean>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.rights$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(p => p?.account?.role?.rights || []),
    );

    this._selectorsType = this._activatedRoute.snapshot.data.type;

    this.layoutType$ = this._store.pipe(
      select(SettingsSelectors.selectSelectorsLayout),
    );

    this.displayInactiveEntities$ = this._store.pipe(
      select(SettingsSelectors.selectSelectorsInactiveVisibility),
    );

    this._store.dispatch(SelectorsActions.getAllRequest({
      options: {
        filter: [{
          id: 'type', operation: 'equals', value: this._selectorsType,
        }],
      }
    }));

    this._store.dispatch(TagsActions.getAllRequest({}));

    this._store.dispatch(AssetsActions.getAllRequest());

    this._store.dispatch(LanguagesActions.getAllRequest({}));

    this._store.dispatch(SystemTagsActions.getAllRequest(
      {
        params: {
          options: {
            filter: [{
              id: "extra.entity",
              operation: "equals",
              value: this._selectorsType,
            }],
          }
        },
        callback: (systemTags: Array<ISystemTag>) => { },
      }
    ));

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(SelectorsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SystemTagsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isProductsProgress, isAssetsProgress, isLanguagesProcess, isSystemTagsProcess]) =>
        isProductsProgress || isAssetsProgress || isLanguagesProcess || isSystemTagsProcess),
    );

    this.collection$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
    );

    this.systemTags$ = this._store.pipe(
      select(SystemTagsSelectors.selectCollection),
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

    this.isPrepareToShow$ = combineLatest([
      this.collection$,
      this.assets$,
      this.languages$,
      this.tags$,
    ]).pipe(
      map(([collection, assets, languages, tags]) =>
        !!collection && !!assets && !!languages && !!tags),
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(SelectorsActions.clear());
    this._store.dispatch(AssetsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
  }

  onCreate(): void {

    this._store.dispatch(SelectorActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { type: this._selectorsType },
    });
  }

  onEdit(selector: ISelector): void {

    this._store.dispatch(SelectorActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: selector.id, type: this._selectorsType },
    });
  }

  onUpdate(selector: ISelector): void {
    this._store.dispatch(SelectorsActions.updateRequest({ id: selector.id, selector }));
  }

  onDelete(id: string): void {
    this._store.dispatch(SelectorsActions.deleteRequest({ id }));
  }

  onReposition(positions: Array<IEntityPosition>): void {
    this._store.dispatch(SelectorsActions.repositionRequest({
      positions, options: {
        filter: [
          {
            id: "type",
            operation: "equals",
            value: this._selectorsType,
          }
        ]
      }
    }));
  }

  onSystemTagsReposition(positions: Array<IEntityPosition>): void {
    this._store.dispatch(SystemTagsActions.repositionRequest({
      positions,
      options: {
        filter: [{
          id: "extra.entity",
          operation: "equals",
          value: this._selectorsType,
        }],
      }
    }));
  }

  onChangeLayout(layout: LayoutTypes): void {
    this._store.dispatch(SettingsActions.changeSelectorsLayout({ layout }));
  }

  onChangeDisplayInactiveEntities(showInactive: boolean): void {
    this._store.dispatch(SettingsActions.changeSelectorsVisibility({ showInactive }));
  }
}
