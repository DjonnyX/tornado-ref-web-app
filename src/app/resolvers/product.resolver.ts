import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { IProduct } from '@app/models/product.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { ProductsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { IMetaRefsResponse } from '@services';

interface IData {
    collection: Array<IProduct>;
    ref: IMetaRefsResponse;
}

@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<IData> {
    constructor(private _store: Store<IAppState>) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IData> {
        this._store.dispatch(ProductsActions.getAllRequest());

        return forkJoin(
            this._store.pipe(
                select(ProductsSelectors.selectCollection)
            ),
            this._store.pipe(
                select(ProductsSelectors.selectRefInfo)
            ),
        ).pipe(
            map(([collection, ref]) => ({ collection, ref })),
        );
    }
}