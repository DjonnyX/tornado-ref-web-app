import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { SelectorsActions } from '@store/actions/selectors.action';
import { Observable } from 'rxjs';
import { SelectorsSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, ISelector } from '@models';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagsActions } from '@store/actions/tags.action';

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

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.isProcess$ = this._store.pipe(
      select(SelectorsSelectors.selectIsCreateProcess),
    );

    this.isEditMode = !!this._activatedRoute.snapshot.queryParams["isEditMode"];

    this._store.dispatch(TagsActions.getAllRequest());

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    )

    if (this.isEditMode) {
      this.selector$ = this._store.pipe(
        select(SelectorsSelectors.selectEditSelector),
      );
    } else {
      this.selector$ = this._store.pipe(
        select(SelectorsSelectors.selectNewSelector),
      );
    }

    this.selector$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(selector => {
      this._selector = selector;
    })

    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSubmit(selector: ISelector): void {
    if (this.isEditMode) {
      this._store.dispatch(SelectorsActions.setEditSelector({ selector: undefined }));
      this._store.dispatch(SelectorsActions.updateRequest({ id: selector.id, selector }));
    } else {
      this._store.dispatch(SelectorsActions.setNewSelector({ selector: undefined }));
      this._store.dispatch(SelectorsActions.createRequest(selector));
    }

    this._router.navigate([this._returnUrl]);
  }

  onUpdate(selector: ISelector): void {
    const s = {...this._selector, ...selector};
    
    if (this.isEditMode) {
      this._store.dispatch(SelectorsActions.setEditSelector({ selector: s }));
    } else {
      this._store.dispatch(SelectorsActions.setNewSelector({ selector: s }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }
}
