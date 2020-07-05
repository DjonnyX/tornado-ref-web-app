import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ProductNodesActions } from '@store/actions/product-nodes.action';

@Injectable()
export default class ProductNodesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductNodesActions.getAllRequest),
            switchMap(({ id }) => {
                return this._apiService.getNodes(id).pipe(
                    mergeMap(res => {
                        return [ProductNodesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductNodesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductNodesActions.createRequest),
            switchMap(({ node }) => {
                return this._apiService.createNode({
                    type: node.type,
                    parentId: node.parentId,
                    contentId: node.contentId,
                    children: node.children,
                }).pipe(
                    mergeMap(res => {
                        return [ProductNodesActions.createSuccess({ changed: res.data.changed, created: res.data.created, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductNodesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductNodesActions.updateRequest),
            switchMap(({ id, node }) => {
                return this._apiService.updateNode(id, {
                    type: node.type,
                    parentId: node.parentId,
                    contentId: node.contentId,
                    children: node.children,
                }).pipe(
                    mergeMap(res => {
                        return [ProductNodesActions.updateSuccess({ node: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductNodesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductNodesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteNode(id).pipe(
                    mergeMap(res => {
                        return [ProductNodesActions.deleteSuccess({ deleted: res.data.deleted, changed: res.data.changed, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductNodesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
