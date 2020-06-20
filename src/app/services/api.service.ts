import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from '@models';
import { ApiRoutesService } from './api-routes.service';
import { IUserAuthRequest, IUserAuthResponse } from './interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient, private _apiRoutes: ApiRoutesService) { }

  public auth(params: IUserAuthRequest): Observable<IUser> {
    return this._http
    .post<IUserAuthResponse>(this._apiRoutes.login, params)
    .pipe(map(res => res.data));
  }
  
  public registration(params: IUserAuthRequest): Observable<IUser> {
    return this._http
    .post<IUserAuthResponse>(this._apiRoutes.login, params)
    .pipe(map(res => res.data));
  }
}
