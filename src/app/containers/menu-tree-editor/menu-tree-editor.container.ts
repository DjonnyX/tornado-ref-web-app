import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { INode, ISelector, IProduct, IRef } from '@models';
import { IAppState } from '@store/state';
import { MenuNodesSelectors, SelectorsSelectors, ProductsSelectors } from '@store/selectors';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ProductsActions } from '@store/actions/products.action';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'ta-menu-tree-editor',
  templateUrl: './menu-tree-editor.container.html',
  styleUrls: ['./menu-tree-editor.container.scss']
})
export class MenuTreeEditorContainer implements OnInit {

  nodes$: Observable<Array<INode>>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  refInfo$: Observable<IRef>;

  isProcess$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this._store.dispatch(MenuNodesActions.getAllRequest());

    this._store.dispatch(SelectorsActions.getAllRequest());

    this._store.dispatch(ProductsActions.getAllRequest());

    this.nodes$ = this._store.pipe(
      select(MenuNodesSelectors.selectCollection),
    );

    this.selectors$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
    );

    this.products$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(MenuNodesSelectors.selectRefInfo),
    );

    this.isProcess$ = forkJoin(
      this._store.pipe(
        select(MenuNodesSelectors.selectLoading),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectLoading),
      ),
      mergeMap(([menuNodesLoading, selectorsLoading, productsLoading]) => menuNodesLoading || selectorsLoading || productsLoading),
    );
  }

  onSearch(pattern: string): void {

  }

  onCreate(node: INode): void {
    this._store.dispatch(MenuNodesActions.createRequest({ node }));
  }

  onEdit(node: INode): void {

  }

  onDelete(node: INode): void {
    this._store.dispatch(MenuNodesActions.deleteRequest({ id: node.id }));
  }
}
