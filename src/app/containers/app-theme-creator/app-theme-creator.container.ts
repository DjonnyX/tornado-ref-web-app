import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { AppThemeAssetsSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { AppThemeAssetsActions } from '@store/actions/app-theme-assets.action';
import { AppThemeSelectors } from '@store/selectors/app-theme.selectors';
import { AppThemeActions } from '@store/actions/app-theme.action';
import { IAppTheme, TerminalTypes } from '@djonnyx/tornado-types';
import { getThemeDescriptor, ICompiledTheme } from '@app/utils/app-theme.util';

@Component({
  selector: 'ta-app-theme-creator',
  templateUrl: './app-theme-creator.container.html',
  styleUrls: ['./app-theme-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemeCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  compiledTheme$: Observable<ICompiledTheme>;

  themeAssets$: Observable<Array<IAsset>>;

  assets$: Observable<Array<IAsset>>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _themeId: string;

  private _themeId$ = new BehaviorSubject<string>(undefined);
  readonly themeId$ = this._themeId$.asObservable();

  private _terminalType: TerminalTypes;

  private _pagePath: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._terminalType = this._activatedRoute.snapshot.data["type"];

    this._pagePath = this._activatedRoute.snapshot.data["path"];

    this._themeId = this._activatedRoute.snapshot.queryParams["id"];
    this._themeId$.next(this._themeId);

    this.isEditMode = !!this._themeId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(AppThemeSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AppThemeAssetsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isGetAppThemeProcess, isAssetsProcess]) =>
        isGetAppThemeProcess || isAssetsProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(AppThemeSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(AppThemeSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) =>
        isCreateProcess || isUpdateProcess),
    );

    this.isProcessAssets$ = combineLatest([
      this._store.pipe(
        select(AppThemeAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AppThemeAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(AppThemeAssetsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) =>
        isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.assets$ = this._store.pipe(
      select(AppThemeAssetsSelectors.selectCollection),
    );

    this.themeAssets$ = this._store.select(AppThemeAssetsSelectors.selectCollection).pipe(
      filter(assets => !!assets),
      switchMap(assets => {
        return of(assets);
      }),
    );

    this.compiledTheme$ = this._store.select(AppThemeSelectors.selectEntity).pipe(
      filter(theme => !!theme),
      map(theme => ({
        theme,
        descriptor: getThemeDescriptor(theme),
      }))
    );

    this.compiledTheme$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(theme => {
      this._themeId = theme.theme.id;
      this._themeId$.next(this._themeId);
      this.isEditMode = true;

      this._store.dispatch(AppThemeAssetsActions.getAllRequest({
        options: {
          filter: [{
            id: '_id', operation: 'equals', value: this._themeId,
          }],
        },
      }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._themeId,
        },
      });
    });

    if (!!this._themeId) {
      this._store.dispatch(AppThemeActions.getRequest({ id: this._themeId }));
    }

    const prepareMainRequests$ = of(true);

    this.isPrepareToConfigure$ = this.themeId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          this.compiledTheme$,
          this.themeAssets$,
        ]).pipe(
          map(([compiledTheme, themeAssets]) =>
            !!compiledTheme && !!themeAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(AppThemeActions.clear());
    this._store.dispatch(AppThemeAssetsActions.clear());
  }

  onResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(AppThemeAssetsActions.uploadResourceRequest({ themeId: this._themeId, resourcesType: data.key, data }));
  }

  onResourceDelete(key: string): void {
    this._store.dispatch(AppThemeAssetsActions.deleteResourceRequest({ themeId: this._themeId, resourcesType: key }));
  }

  onMainOptionsSave(theme: IAppTheme): void {
    if (this.isEditMode) {
      this._store.dispatch(AppThemeActions.updateRequest({ id: theme.id, theme }));
    } else {
      this._store.dispatch(AppThemeActions.createRequest({ theme, terminalType: this._terminalType }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate([`/admin/${this._pagePath}`]);
  }

  onToBack(): void {
    this._router.navigate([`/admin/${this._pagePath}`]);
  }
}
