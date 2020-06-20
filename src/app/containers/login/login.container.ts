import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserActions } from '@store/actions/user.action';
import { UserSelectors } from '@store/selectors/user.selector';
import { IUserAuthRequest } from '@services';
import { Observable } from 'rxjs';

@Component({
  selector: 'tss-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss']
})
export class LoginContainer implements OnInit {

  public loaded$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.loaded$ = this._store
      .pipe(select(UserSelectors.selectLoaded));
  }

  onLoginRequest(val: IUserAuthRequest) {
    this._store.dispatch(UserActions.userAuthRequest(val));
  }
}
