import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Auth, initialAuth, AuthStore } from '../../models/AuthModel';
import RS from '../../shared/resources/ResourceManager';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuthReducers from '../store/index';

@Component({
    moduleId: module.id,
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    resource: any;
    auth: Auth;
    error$: Observable<any>;
    loading$: Observable<boolean>;

    constructor(private store: Store<AuthStore>,
                private router: Router) { }

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
