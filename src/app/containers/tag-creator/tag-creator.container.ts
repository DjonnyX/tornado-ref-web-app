import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagActions } from '@store/actions/tag.action';
import { TagSelectors } from '@store/selectors/tag.selectors';
import { ITag } from '@djonnyx/tornado-types';

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

  private _tagId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._tagId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._tagId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(TagSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagsSelectors.selectIsCreateProcess),
      ),
    ).pipe(
      map(([isTagGetProcess, isTagsGetProcess]) => isTagGetProcess || isTagsGetProcess),
    );

    this.tag$ = this._store.pipe(
      select(TagSelectors.selectEntity),
    );

    this.tag$.pipe(
      takeUntil(this.unsubscribe$),
      filter(tag => !!tag),
      filter(tag => this._tagId !== tag.id),
    ).subscribe(tag => {
      this._tagId = tag.id;
      this.isEditMode = !!this._tagId;
    });

    if (!!this._tagId) {
      this._store.dispatch(TagActions.getRequest({ id: this._tagId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(TagActions.clear());
  }

  onSubmit(tag: ITag): void {
    if (this.isEditMode) {
      this._store.dispatch(TagActions.updateRequest({ id: tag.id, tag }));
    } else {
      this._store.dispatch(TagActions.createRequest({ tag }));
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
