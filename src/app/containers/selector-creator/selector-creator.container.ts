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
import { ISelector, ITag, SelectorTypes } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-selector-creator',
  templateUrl: './selector-creator.container.html',
  styleUrls: ['./selector-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _selector: ISelector;

  selector$: Observable<ISelector>;

  tags$: Observable<Array<ITag>>;

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
      filter(selector => this._selectorId !== selector.id),
    ).subscribe(selector => {
      this._selectorId = selector.id;
      this.isEditMode = !!this._selectorId;
    });

    if (!!this._selectorId) {
      this._store.dispatch(SelectorActions.getRequest({ id: this._selectorId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(SelectorActions.clear());
  }

  onSubmit(selector: ISelector): void {
    if (this.isEditMode) {
      this._store.dispatch(SelectorActions.updateRequest({ id: selector.id, selector }));
    } else {
      this._store.dispatch(SelectorActions.createRequest({ selector: {...selector, type: this._selectorType} }));
    }

    this._router.navigate([this._returnUrl]);
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
