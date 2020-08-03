import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagActions } from '@store/actions/tag.action';
import { ITag, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-tags-editor',
  templateUrl: './tags-editor.container.html',
  styleUrls: ['./tags-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ITag>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(TagsActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(TagsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(TagsSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(TagActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(tag: ITag): void {

    this._store.dispatch(TagActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: tag.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(tag: ITag): void {
    this._store.dispatch(TagsActions.updateRequest({id: tag.id, tag}));
  }

  onDelete(id: string): void {
    this._store.dispatch(TagsActions.deleteRequest({ id }));
  }
}
