import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from '@models';
import { IUserSigninRequest, IUserSigninResponse, IUserSignupRequest, IUserSignupResponse } from './interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  public signin(params: IUserSigninRequest): Observable<IUser> {
    return this._http
    .post<IUserSigninResponse>("api/v1/auth/signin", params)
    .pipe(map(res => res.data));
  }
  
  public signup(params: IUserSignupRequest): Observable<{}> {
    return this._http
    .post<IUserSignupResponse>("api/v1/auth/signup", params)
    .pipe(map(res => res.data));
  }
}
