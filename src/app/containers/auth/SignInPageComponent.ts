import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Auth, initialAuth, AuthStore } from '../../models/auth.model';
import RS from '../../shared/resources/resource-manager';
import * as fromAuthActions from '../../actions/AuthAction';
import * as fromAuthReducers from '../../reducers/auth/index';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sign-in',
    templateUrl: './SignInPageView.html'
})

export class SignInPageComponent implements OnInit {
    resource: any;
    auth: Auth;
    error$: Observable<any>;
    loading$: Observable<boolean>;

    constructor(private store: Store<AuthStore>) { }

    ngOnInit() {
        this.resource = RS;
        this.auth = initialAuth;
        this.error$ = this.store.select(fromAuthReducers.getSignInError);
        this.loading$ = this.store.select(fromAuthReducers.getSignInLoading);
    }

    onSubmit($event: Auth) {
        this.store.dispatch(new fromAuthActions.SignInAction($event));
    }
}
