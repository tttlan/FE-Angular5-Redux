import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as Auth from '../actions/AuthAction';
import * as fromAuth from '../reducers/auth/index';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromAuth.State>) { }

  canActivate(): Observable<boolean> {
    const observable = this.store.select(fromAuth.getLoggedIn);
    observable.subscribe(authed => {
      if (!authed) {
        this.store.dispatch(new Auth.SignInRedirectAction());
        return false;
      }

      return true;
    });

    return observable;
  }
}
