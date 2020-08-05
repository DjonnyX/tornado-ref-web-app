import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { SelectorsSelectors } from '@store/selectors';
import { SelectorsActions } from '@store/actions/selectors.action';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { SelectorActions } from '@store/actions/selector.action';
import { ISelector, ITag, IRef, SelectorTypes } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-selectors-editor',
  templateUrl: './selectors-editor.container.html',
  styleUrls: ['./selectors-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ISelector>>;

  public tags$: Observable<Array<ITag>>;

  public refInfo$: Observable<IRef>;

  private _selectorsType: SelectorTypes;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._selectorsType = this._activatedRoute.snapshot.data.type;

    this._store.dispatch(SelectorsActions.getAllRequest({ selectorType: this._selectorsType }));

    this._store.dispatch(TagsActions.getAllRequest());

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    )

    this.isProcess$ = this._store.pipe(
      select(SelectorsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(SelectorsSelectors.selectRefInfo),
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
