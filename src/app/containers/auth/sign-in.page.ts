import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Auth, initialAuth, State } from '../../models/auth.model';
import { LoginPageResource } from '../../shared/resources/auth.resource';
import * as fromAuthActions from '../../actions/auth.action';
import * as fromAuthReducers from '../../reducers/auth/index';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sign-in',
    templateUrl: './sign-in.page.html'
})

export class SignInComponent implements OnInit {
    resource: any;
    auth: Auth;
    error$: Observable<any>;
    loading$: Observable<boolean>;

    constructor(private store: Store<State>) { }

    ngOnInit() {
        this.resource = LoginPageResource;
        this.auth = initialAuth;
        this.error$ = this.store.select(fromAuthReducers.getSignInError);
        this.loading$ = this.store.select(fromAuthReducers.getSignInLoading);
    }

    onSubmit($event: Auth) {
        this.store.dispatch(new fromAuthActions.SignInAction($event));
    }
}