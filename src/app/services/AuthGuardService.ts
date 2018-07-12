import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as Auth from '../auth/store/AuthAction';
import * as fromAuth from '../auth/store/index';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromAuth.State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
