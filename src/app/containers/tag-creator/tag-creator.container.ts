import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable } from 'rxjs';
import { ProductsSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { ITag } from '@models';
import { TagsActions } from '@store/actions/tags.action';

@Component({
  selector: 'ta-tag-creator',
  templateUrl: './tag-creator.container.html',
  styleUrls: ['./tag-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _tag: ITag;

  tag$: Observable<ITag>;

  isEditMode = false;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.isProcess$ = this._store.pipe(
      select(ProductsSelectors.selectIsCreateProcess),
    );

    this.isEditMode = !!this._activatedRoute.snapshot.queryParams["isEditMode"];

    if (this.isEditMode) {
      this.tag$ = this._store.pipe(
        select(TagsSelectors.selectEditTag),
      );
    } else {
      this.tag$ = this._store.pipe(
        select(TagsSelectors.selectNewTag),
      );
    }

    this.tag$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(tag => {
      this._tag = tag;
    })

    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onSubmit(tag: ITag): void {
    if (this.isEditMode) {
      this._store.dispatch(TagsActions.setEditTag({ tag: undefined }));
      this._store.dispatch(TagsActions.updateRequest({ id: tag.id, tag }));
    } else {
      this._store.dispatch(TagsActions.setNewTag({ tag: undefined }));
      this._store.dispatch(TagsActions.createRequest(tag));
    }

    this._router.navigate([this._returnUrl]);
  }

  onUpdate(tag: ITag): void {
    const t = { ...this._tag, ...tag };

    if (this.isEditMode) {
      this._store.dispatch(TagsActions.setEditTag({ tag: t }));
    } else {
      this._store.dispatch(TagsActions.setNewTag({ tag: t }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }
}
