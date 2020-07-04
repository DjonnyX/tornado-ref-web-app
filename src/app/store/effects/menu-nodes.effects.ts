import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';

@Injectable()
export default class MenuNodesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getNodes().pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(MenuNodesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.createRequest),
            switchMap(({ node }) => {
                return this._apiService.createNode({
                    type: node.type,
                    parentId: node.parentId,
                    contentId: node.contentId,
                    children: node.children,
                }).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.createSuccess({ parent: res.data.parent, child: res.data.child, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(MenuNodesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.updateRequest),
            switchMap(({ id, node }) => {
                return this._apiService.updateNode(id, {
                    type: node.type,
                    parentId: node.parentId,
                    contentId: node.contentId,
                    children: node.children,
                }).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.updateSuccess({ node: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(MenuNodesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(MenuNodesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteNode(id).pipe(
                    mergeMap(res => {
                        return [MenuNodesActions.deleteSuccess({ ids: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(MenuNodesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
