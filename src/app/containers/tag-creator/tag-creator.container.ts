import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { TagsSelectors, TagAssetsSelectors, AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { TagAssetsActions } from '@store/actions/tag-assets.action';
import { TagSelectors } from '@store/selectors/tag.selectors';
import { TagActions } from '@store/actions/tag.action';
import { ITag, TagResourceTypes, ILanguage, ITagContents } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { deepMergeObjects } from '@app/utils/object.util';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';

@Component({
  selector: 'ta-tag-creator',
  templateUrl: './tag-creator.container.html',
  styleUrls: ['./tag-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  tag$: Observable<ITag>;

  tags$: Observable<Array<ITag>>;

  tagAssets$: Observable<Array<IAsset>>;

  assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _tagId: string;

  private _tagId$ = new BehaviorSubject<string>(undefined);
  readonly tagId$ = this._tagId$.asObservable();

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._tagId = this._activatedRoute.snapshot.queryParams["id"];
    this._tagId$.next(this._tagId);

    this.isEditMode = !!this._tagId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(TagSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isGetTagProcess, isTagsProcess, isAssetsProcess, isLanguagesProcess]) =>
        isGetTagProcess || isTagsProcess || isAssetsProcess || isLanguagesProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(TagSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(TagSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) =>
        isCreateProcess || isUpdateProcess),
    );

    this.isProcessAssets$ = combineLatest([
      this._store.pipe(
        select(TagAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(TagAssetsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) =>
        isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.defaultLanguage$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(lang => {
      this._defaultLanguage = lang;
    });

    this.tagAssets$ = combineLatest([
      this._store.select(TagAssetsSelectors.selectCollection),
      this.languages$,
    ]).pipe(
      filter(([assets, langs]) => !!assets && !!langs),
      switchMap(([assets, langs]) => {
        const result = new Array<IAsset>();

        for (const lang in assets) {
          result.push(...assets[lang]);
        }

        return of(result);
      }),
    );

    this.tag$ = combineLatest([
      this._store.select(TagSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([tag, langs, defaultLang]) => !!tag && !!defaultLang && !!langs),
      map(([tag, langs, defaultLang]) => {
        return { ...tag, contents: getCompiledContents(tag.contents, langs, defaultLang) };
      })
    );

    this.tag$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(tag => {
      this._tagId = tag.id;
      this._tagId$.next(this._tagId);
      this.isEditMode = true;

      this._store.dispatch(TagAssetsActions.getAllRequest({ tagId: this._tagId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._tagId,
        }
      });
    });

    if (!!this._tagId) {
      this._store.dispatch(TagActions.getRequest({ id: this._tagId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest());
    this._store.dispatch(AssetsActions.getAllRequest());

    const prepareMainRequests$ = combineLatest([
      this.tags$,
      this.languages$,
      this.defaultLanguage$,
      this.assets$,
    ]).pipe(
      map(([tags, languages, defaultLanguage, assets]) =>
        !!tags && !!languages && !!defaultLanguage && !!assets),
    );

    this.isPrepareToConfigure$ = this.tagId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          prepareMainRequests$,
          this.tag$,
          this.tagAssets$,
        ]).pipe(
          map(([prepareMainRequests, tag, tagAssets]) =>
            !!prepareMainRequests && !!tag && !!tagAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(TagActions.clear());
    this._store.dispatch(TagAssetsActions.clear());
  }

  onMainResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(TagAssetsActions.uploadResourceRequest({ tagId: this._tagId, resourcesType: TagResourceTypes.MAIN, data }));
  }

  onIconResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(TagAssetsActions.uploadResourceRequest({ tagId: this._tagId, resourcesType: TagResourceTypes.ICON, data }));
  }

  onMainOptionsSave(tag: ITag): void {
    if (this.isEditMode) {
      const normalizedTag: ITag = { ...tag };

      // нормализация контена
      normalizeEntityContents(normalizedTag.contents, this._defaultLanguage.code);

      this._store.dispatch(TagActions.updateRequest({ id: tag.id, tag: normalizedTag }));
    } else {
      this._store.dispatch(TagActions.createRequest({ tag }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate(["/admin/tags"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/tags"]);
  }
}
