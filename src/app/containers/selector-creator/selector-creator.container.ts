import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagsActions } from '@store/actions/tags.action';
import { SelectorActions } from '@store/actions/selector.action';
import { SelectorSelectors } from '@store/selectors/selector.selectors';
import { ISelector, ITag, SelectorTypes, IAsset, ISelectorImages, SelectorImageTypes } from '@djonnyx/tornado-types';
import { SelectorAssetsSelectors, SelectorsSelectors } from '@store/selectors';
import { SelectorAssetsActions } from '@store/actions/selector-assets.action';

@Component({
  selector: 'ta-selector-creator',
  templateUrl: './selector-creator.container.html',
  styleUrls: ['./selector-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  private _returnUrl: string;

  private _selector: ISelector;

  selector$: Observable<ISelector>;

  selectorAssets$: Observable<Array<IAsset>>;

  tags$: Observable<Array<ITag>>;

  images$: Observable<ISelectorImages>;

  isEditMode = false;

  private _selectorId: string;

  private _selectorType: SelectorTypes;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._selectorId = this._activatedRoute.snapshot.queryParams["id"];

    this._selectorType = this._activatedRoute.snapshot.queryParams["type"];

    this.isEditMode = !!this._selectorId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(SelectorSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorSelectors.selectIsCreateProcess),
      ),
    ).pipe(
      map(([isSelectorGetProcess, isSelectorsGetProcess]) => isSelectorGetProcess || isSelectorsGetProcess),
    );

    this.isProcessAssets$ = combineLatest(
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsDeleteProcess),
      ),
    ).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) => isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(SelectorSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(SelectorSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.selectorAssets$ = this._store.pipe(
      select(SelectorAssetsSelectors.selectCollection),
    );

    this.images$ = this._store.pipe(
      select(SelectorSelectors.selectImages),
    );

    this._store.dispatch(TagsActions.getAllRequest());

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.selector$ = this._store.pipe(
      select(SelectorSelectors.selectEntity),
    );

    this.selector$.pipe(
      takeUntil(this.unsubscribe$),
      filter(selector => !!selector),
    ).subscribe(selector => {
      this._selector = selector;
      this._selectorId = selector.id;
      this.isEditMode = !!this._selectorId;
    });

    if (!!this._selectorId) {
      this._store.dispatch(SelectorActions.getRequest({ id: this._selectorId }));
      this._store.dispatch(SelectorAssetsActions.getAllRequest({ selectorId: this._selectorId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(SelectorActions.clear());
    this._store.dispatch(SelectorAssetsActions.clear());
  }

  onMainOptionsSave(selector: ISelector): void {
    if (this.isEditMode) {
      this._store.dispatch(SelectorActions.updateRequest({ id: selector.id, selector }));
    } else {
      this._store.dispatch(SelectorActions.createRequest({ selector: { ...selector, type: this._selectorType } }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }

  onMainImageUpload(file: File): void {
    this._store.dispatch(SelectorAssetsActions.uploadImageRequest({ selectorId: this._selectorId, imageType: SelectorImageTypes.MAIN, file }));
  }

  onThumbnailImageUpload(file: File): void {
    this._store.dispatch(SelectorAssetsActions.uploadImageRequest({ selectorId: this._selectorId, imageType: SelectorImageTypes.THUMBNAIL, file }));
  }

  onIconImageUpload(file: File): void {
    this._store.dispatch(SelectorAssetsActions.uploadImageRequest({ selectorId: this._selectorId, imageType: SelectorImageTypes.ICON, file }));
  }
}
