import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

import * as fromAuthReducers from '../../auth/store/AuthReducer';
import * as AuthAction from '../../auth/store/AuthAction';
import { AuthStore } from '../../models/AuthModel';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent   {
    loggedIn$: Observable<boolean>;

    constructor(private store: Store<AuthStore>) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
    }

    ngOnInit() {
    }

    onLogout() {
        this.store.dispatch(new AuthAction.SignOutAction());
    }
}
